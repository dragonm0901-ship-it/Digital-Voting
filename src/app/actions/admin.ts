"use server";

import { db } from '@/lib/db';
import { ApiResponse } from '@/types';
import { signAdminToken, getAdminSession } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { MerkleTree } from '@/lib/crypto/merkle-tree';
import { sha256 } from '@/lib/crypto/sha256';

export async function loginAdminAction(username: string, passwordPlain: string): Promise<ApiResponse<{ redirectUrl: string }>> {
  try {
    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const admin = await db.adminUser.findUnique({
      where: { username }
    });

    if (!admin || !admin.isActive) {
      return { success: false, error: 'invalidCredentials', message: 'Invalid username or password' };
    }

    const isValid = await bcrypt.compare(passwordPlain, admin.passwordHash);
    
    if (!isValid) {
      // Optional: Incremental backoff / audit logging for failed tries could be added here
      return { success: false, error: 'invalidCredentials', message: 'Invalid username or password' };
    }

    // Success - Sign JWT
    const token = await signAdminToken({
      id: admin.id,
      username: admin.username,
      role: admin.role,
      province: admin.province,
    });

    // Set HTTP-Only Cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60, // 8 hours
    });

    // Update last login
    await db.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'ADMIN_LOGIN',
        category: 'admin',
        actorType: 'admin',
        actorId: admin.id,
      }
    });

    return { 
      success: true, 
      data: { redirectUrl: '/admin/dashboard' } 
    };

  } catch (error) {
    console.error('Admin Login Error:', error);
    return { success: false, error: 'system_error', message: 'An internal error occurred.' };
  }
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}

export async function getAdminSessionAction(): Promise<ApiResponse<{
  id: string;
  username: string;
  fullName: string;
  role: string;
  province?: number | null;
  district?: string | null;
}>> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'unauthorized' };
    }
    const admin = await db.adminUser.findUnique({
      where: { id: session.id }
    });
    if (!admin || !admin.isActive) {
      return { success: false, error: 'unauthorized' };
    }
    return {
      success: true,
      data: {
        id: admin.id,
        username: admin.username,
        fullName: admin.fullName,
        role: admin.role,
        province: admin.province,
        district: admin.district,
      }
    };
  } catch (error) {
    console.error('getAdminSessionAction error:', error);
    return { success: false, error: 'system_error' };
  }
}

export async function getPendingVotesCountAction(): Promise<ApiResponse<{ count: number }>> {
  try {
    const session = await getAdminSession();
    if (!session) return { success: false, error: 'unauthorized' };

    const count = await db.voteRecord.count({
      where: { status: 'queued' }
    });
    return { success: true, data: { count } };
  } catch (error) {
    console.error('getPendingVotesCountAction error:', error);
    return { success: false, error: 'system_error' };
  }
}

export async function runMerkleBatcherAction(): Promise<ApiResponse<{ committedCount: number; blockNumber: number }>> {
  try {
    const session = await getAdminSession();
    if (!session || (session.role !== 'superadmin' && session.role !== 'commissioner')) {
      return { success: false, error: 'unauthorized' };
    }

    // Get all queued votes
    const queuedVotes = await db.voteRecord.findMany({
      where: { status: 'queued' },
      orderBy: { castAt: 'asc' }
    });

    if (queuedVotes.length === 0) {
      return { success: true, data: { committedCount: 0, blockNumber: 0 } };
    }

    // Build leaves, parsing selection envelope if present
    const leaves = queuedVotes.map(vote => {
      let zkProofString = vote.encryptedBallot;
      try {
        const parsed = JSON.parse(vote.encryptedBallot);
        if (parsed.zkProof) {
          zkProofString = parsed.zkProof;
        }
      } catch (e) {
        // Fallback to raw string if it's not JSON
      }

      const votePayload = {
        partyId: '',
        zkProofString,
        timestamp: vote.castAt.toISOString()
      };
      return JSON.stringify(votePayload);
    });

    // Create Merkle Tree
    const merkleTree = await MerkleTree.create(leaves);
    const merkleRoot = merkleTree.getRoot();

    // Fetch last LedgerBlock to calculate next block number
    const lastBlock = await db.ledgerBlock.findFirst({
      orderBy: { blockNumber: 'desc' }
    });
    const blockNumber = lastBlock ? lastBlock.blockNumber + 1 : 1;
    const previousHash = lastBlock ? lastBlock.blockHash : '0x0000000000000000000000000000000000000000000000000000000000000000';

    // Create validator node signature name
    const validatorNode = `NEPAL-EC-NODE-${session.id.substring(0, 4).toUpperCase()}`;

    // Create new LedgerBlock contents and hash it
    const blockContents = JSON.stringify({
      blockNumber,
      merkleRoot,
      voteCount: queuedVotes.length,
      validatorNode,
      previousHash,
    });
    const blockHash = await sha256(blockContents);

    // Write LedgerBlock to DB
    await db.ledgerBlock.create({
      data: {
        blockNumber,
        merkleRoot,
        voteCount: queuedVotes.length,
        validatorNode,
        previousHash,
        blockHash,
      }
    });

    // Update each VoteRecord
    for (let i = 0; i < queuedVotes.length; i++) {
      const vote = queuedVotes[i];
      const leafHash = merkleTree.getLayers()[0][i];

      await db.voteRecord.update({
        where: { id: vote.id },
        data: {
          status: 'committed',
          merkleRoot,
          merkleLeafHash: leafHash,
          blockNumber,
          committedAt: new Date()
        }
      });
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'BLOCK_COMMITTED',
        category: 'system',
        severity: 'info',
        actorType: 'system',
        actorId: 'SYSTEM',
        details: JSON.stringify({ blockNumber, merkleRoot, voteCount: queuedVotes.length }),
      }
    });

    return {
      success: true,
      data: {
        committedCount: queuedVotes.length,
        blockNumber,
      }
    };
  } catch (error) {
    console.error('runMerkleBatcherAction error:', error);
    return { success: false, error: 'system_error' };
  }
}
