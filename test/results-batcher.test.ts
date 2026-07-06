jest.mock('@/lib/auth', () => {
  return {
    getAdminSession: jest.fn().mockResolvedValue({
      id: 'test-admin-id',
      username: 'admin',
      role: 'superadmin',
      province: 3,
    }),
    verifyAdminToken: jest.fn(),
    signAdminToken: jest.fn(),
  };
});

import { db } from '@/lib/db';
import { runMerkleBatcherAction } from '@/app/actions/admin';
import { getLiveResultsAction, castVoteAction } from '@/app/actions/vote';
import { getAdminSession } from '@/lib/auth';

describe('Merkle Batcher & Dynamic Aggregation', () => {
  it('correctly processes queued votes and aggregates committed results', async () => {
    // 1. Clean dynamic transactional tables only
    await db.otpSession.deleteMany();
    await db.voteRecord.deleteMany();
    await db.ledgerBlock.deleteMany();

    // 2. Safely upsert static/seeded data to avoid schema cascades
    const election = await db.election.upsert({
      where: { electionId: 'GE-2025-001' },
      update: { status: 'active' },
      create: {
        electionId: 'GE-2025-001',
        title: 'General Election 2025',
        type: 'general',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    });

    await db.voter.upsert({
      where: { voterId: 'VOTER12345' },
      update: { hasVoted: false },
      create: {
        voterId: 'VOTER12345',
        citizenshipNo: '12-34-56-789',
        fullName: 'Ram Bahadur Thapa',
        dateOfBirth: new Date('1990-01-01'),
        province: 3,
        district: 'Kathmandu',
        municipality: 'Kathmandu Metropolitian City',
        ward: 1,
        registeredPhone: '9841234567',
        isActive: true,
        hasVoted: false,
      }
    });

    await db.voter.upsert({
      where: { voterId: 'MY-NEW-VOTER-ID' },
      update: { hasVoted: false },
      create: {
        voterId: 'MY-NEW-VOTER-ID',
        citizenshipNo: '99-88-77-666',
        fullName: 'New Custom User',
        dateOfBirth: new Date('2000-05-15'),
        province: 3,
        district: 'Kathmandu',
        municipality: 'Kathmandu Metropolitian City',
        ward: 5,
        registeredPhone: '9840000000',
        isActive: true,
        hasVoted: false,
      }
    });

    // 3. Initially live results should be empty
    const initRes = await getLiveResultsAction();
    expect(initRes.success).toBe(true);
    expect(initRes.data?.totalLiveVotes).toBe(0);

    // 4. Cast test votes
    const cast1 = await castVoteAction('p1-p2', 'VOTER12345');
    expect(cast1.success).toBe(true);
    
    const cast2 = await castVoteAction('p3-p2', 'MY-NEW-VOTER-ID');
    expect(cast2.success).toBe(true);

    // Verify votes are queued
    const queuedCount = await db.voteRecord.count({ where: { status: 'queued' } });
    expect(queuedCount).toBe(2);

    // 5. Verify that observer role is blocked
    (getAdminSession as jest.Mock).mockResolvedValueOnce({
      id: 'test-observer-id',
      username: 'observer',
      role: 'observer',
      province: 3,
    });
    const observerRes = await runMerkleBatcherAction();
    expect(observerRes.success).toBe(false);
    expect(observerRes.error).toBe('unauthorized');

    // 6. Run Merkle Batcher as superadmin
    const batchRes = await runMerkleBatcherAction();
    expect(batchRes.success).toBe(true);
    expect(batchRes.data?.committedCount).toBe(2);
    expect(batchRes.data?.blockNumber).toBeGreaterThanOrEqual(1);

    // Verify votes are committed
    const committedCount = await db.voteRecord.count({ where: { status: 'committed' } });
    expect(committedCount).toBe(2);

    // 6. Query live results again and verify sums
    const liveRes = await getLiveResultsAction();
    expect(liveRes.success).toBe(true);
    expect(liveRes.data?.totalLiveVotes).toBe(2);

    // Check PR selections (both voted for p2)
    expect(liveRes.data?.partyPRVotes['p2']).toBe(2);

    // Check Direct selections (one for p1, one for p3)
    expect(liveRes.data?.partyDirectVotes['p1']).toBe(1);
    expect(liveRes.data?.partyDirectVotes['p3']).toBe(1);
  });
});
