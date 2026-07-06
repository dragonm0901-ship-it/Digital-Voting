"use server";

import { db } from '@/lib/db';
import { ApiResponse, CastVoteResponse, VoteReceipt } from '@/types';
import { ZKProver } from '@/lib/crypto/zk-proof';
import { MerkleTree, type MerkleProofNode } from '@/lib/crypto/merkle-tree';

const ELECTION_ID = 'GE-2025-001';

/**
 * Cast Vote implements the "Queue-first" architecture.
 * In a real implementation:
 * 1. Client creates ZK-Proof and encrypts vote
 * 2. Client sends encrypted payload to server
 * 3. Server drops into Kafka queue
 *
 * For this demo, we simulate Step 1 & 2 on the server using Server Actions,
 * but store it in our Prisma database simulating a queue system.
 */
export async function castVoteAction(partyId: string, voterId: string): Promise<ApiResponse<CastVoteResponse>> {
  try {
    // Note: In reality, voterId should be extracted securely from the session token.
    // For this prototype, we're accepting it as an argument.

    // 1. Verify Voter 
    const voter = await db.voter.findUnique({ where: { voterId }});
    if (!voter) return { success: false, error: 'voterNotFound' };
    if (!voter.isActive) return { success: false, error: 'blocked' };
    if (voter.hasVoted) return { success: false, error: 'already_voted' };

    // 2. Obtain current active election
    const election = await db.election.findUnique({ where: { electionId: ELECTION_ID }});
    if (!election || election.status !== 'active') {
      return { success: false, error: 'system_error', message: 'Election is closed or not available' };
    }

    // 3. Generate ZK-Proof (Privacy Layer)
    // Real hardware would do this on the client. 
    const zkProofPayload = await ZKProver.generateVoteProof(voterId, partyId);
    
    // 4. Extract Nullifier and verify double voting.
    const nullifier = ZKProver.getNullifier(zkProofPayload);
    
    // In our Prisma schema, Nullifier is UNIQUE. 
    // This provides cryptographic double-voting prevention.
    const existingVote = await db.voteRecord.findUnique({ where: { nullifier }});
    if (existingVote) {
       return { success: false, error: 'already_voted' };
    }

    const zkProofString = btoa(JSON.stringify(zkProofPayload));

    // Envelope the selected party selections in JSON format to support tallying
    const partyParts = partyId.split('-');
    const selectedDirect = partyParts[0] || 'p1';
    const selectedPR = partyParts[1] || 'p1';

    const ballotEnvelope = JSON.stringify({
      zkProof: zkProofString,
      selectedDirect,
      selectedPR
    });

    // 5. Store in Prisma (Simulating Kafka Queue DROP)
    const voteRecord = await db.voteRecord.create({
      data: {
        electionId: election.id,
        voterId: voter.id, // Used locally to flag. Real system might decouple this aggressively.
        nullifier,
        zkProofHash: zkProofPayload.publicSignals[2], // Placeholder encrypted hash
        encryptedBallot: ballotEnvelope, // Store JSON envelope
        ballotType: 'proportional',
        province: voter.province,
        status: 'queued',
      }
    });

    // 6. Mark voter as having voted.
    await db.voter.update({
      where: { id: voter.id },
      data: { hasVoted: true },
    });

    // 7. Audit log
    await db.auditLog.create({
      data: {
        electionId: election.id,
        action: 'VOTE_CAST_QUEUED',
        category: 'vote',
        actorType: 'voter',
        actorId: voterId,
      }
    });

    // 8. Immediate response with "Queued" status
    const receipt: VoteReceipt = {
      transactionHash: `0x${voteRecord.id.replace(/\W/g, '')}KAFKA`,
      zkProof: zkProofString,
      timestamp: voteRecord.castAt.toISOString(),
      electionId: ELECTION_ID,
      verificationStatus: 'queued',
      blockNumber: 0,
    };

    // Note: We are no longer simulating the background worker here.
    // In production, a separate cron/kafka consumer batches these queue records
    // into merkle roots and writes to the blockchain.

    return {
      success: true,
      data: { receipt },
    };
  } catch (error) {
    console.error('Cast Vote Error:', error);
    return { success: false, error: 'system_error' };
  }
}

/**
 * Public Audit API: Allows a voter to verify their individual receipt
 */
export async function verifyReceiptAction(receipt: VoteReceipt): Promise<boolean> {
  try {
    if (!receipt.merkleRoot) {
      // Still queued
      return receipt.verificationStatus === 'queued';
    }

    // Lookup the block
    const block = await db.ledgerBlock.findUnique({
      where: { merkleRoot: receipt.merkleRoot }
    });

    if (!block) return false;

    // Verify merkle proof natively if available
    if (receipt.merkleProof && receipt.zkProof) {
        // Need the original vote payload to verify
        const votePayload = {
            partyId: '', // Client doesn't send this for receipt checking usually, but let's assume we have what was hashed
            zkProofString: receipt.zkProof,
            timestamp: receipt.timestamp
        };
        const voteData = JSON.stringify(votePayload);

        return MerkleTree.verify(
            voteData,
            receipt.merkleProof as MerkleProofNode[],
            receipt.merkleRoot
        );
    }

    return true;
  } catch (error) {
    console.error('Receipt verify error:', error);
    return false;
  }
}

export async function getLiveResultsAction(): Promise<ApiResponse<{
  totalLiveVotes: number;
  partyPRVotes: Record<string, number>;
  partyDirectVotes: Record<string, number>;
  provinceVotes: Record<number, number>;
}>> {
  try {
    const votes = await db.voteRecord.findMany({
      where: { status: 'committed' }
    });

    const partyPRVotes: Record<string, number> = {};
    const partyDirectVotes: Record<string, number> = {};
    const provinceVotes: Record<number, number> = {};

    let totalLiveVotes = 0;

    for (const vote of votes) {
      try {
        const envelope = JSON.parse(vote.encryptedBallot);
        if (envelope.selectedPR && envelope.selectedDirect) {
          totalLiveVotes++;
          
          partyPRVotes[envelope.selectedPR] = (partyPRVotes[envelope.selectedPR] || 0) + 1;
          partyDirectVotes[envelope.selectedDirect] = (partyDirectVotes[envelope.selectedDirect] || 0) + 1;
          
          provinceVotes[vote.province] = (provinceVotes[vote.province] || 0) + 1;
        }
      } catch (e) {
        // Fallback for non-enveloped records if any
      }
    }

    return {
      success: true,
      data: {
        totalLiveVotes,
        partyPRVotes,
        partyDirectVotes,
        provinceVotes,
      }
    };
  } catch (error) {
    console.error('getLiveResultsAction error:', error);
    return { success: false, error: 'system_error' };
  }
}
