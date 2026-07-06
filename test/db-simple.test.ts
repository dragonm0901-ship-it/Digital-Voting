import { db } from '@/lib/db';

describe('Simple DB Test Cache Bust', () => {
  it('queries database', async () => {
    const count = await db.election.count();
    console.log("Election count:", count);
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
