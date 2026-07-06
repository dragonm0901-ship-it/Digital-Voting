import { checkRateLimit } from '@/lib/rate-limit';

describe('Rate Limiter Module', () => {
  const testIp = '127.0.0.1';
  const testPath = '/api/test-endpoint';

  beforeEach(() => {
    // Clear environment variables to force local in-memory fallback
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it('allows requests within limit and decrements remaining counts', async () => {
    const res1 = await checkRateLimit(testIp, testPath, 3, 60);
    expect(res1.allowed).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = await checkRateLimit(testIp, testPath, 3, 60);
    expect(res2.allowed).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = await checkRateLimit(testIp, testPath, 3, 60);
    expect(res3.allowed).toBe(true);
    expect(res3.remaining).toBe(0);
  });

  it('blocks requests exceeding limit', async () => {
    const limit = 2;
    // Consume limit
    await checkRateLimit(testIp, '/api/blocked', limit, 60);
    await checkRateLimit(testIp, '/api/blocked', limit, 60);

    // Third request should be blocked
    const res = await checkRateLimit(testIp, '/api/blocked', limit, 60);
    expect(res.allowed).toBe(false);
    expect(res.remaining).toBe(0);
  });

  it('automatically resets limits after window duration', async () => {
    const limit = 1;
    // Consume limit (window = 1 second)
    const res1 = await checkRateLimit(testIp, '/api/expire', limit, 1);
    expect(res1.allowed).toBe(true);
    expect(res1.remaining).toBe(0);

    // Verify it is currently blocked
    const res2 = await checkRateLimit(testIp, '/api/expire', limit, 1);
    expect(res2.allowed).toBe(false);

    // Wait 1.1s for expiration
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Next request should succeed
    const res3 = await checkRateLimit(testIp, '/api/expire', limit, 1);
    expect(res3.allowed).toBe(true);
    expect(res3.remaining).toBe(0);
  });
});
