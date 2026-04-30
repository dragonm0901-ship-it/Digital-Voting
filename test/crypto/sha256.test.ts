import { sha256, sha256Sync, hmacSha256, secureRandomHex } from '@/lib/crypto/sha256';

describe('SHA-256 Module', () => {
  const testString = 'matdaan-digital-voting-nepal';
  // Standard SHA-256 hash for 'matdaan-digital-voting-nepal'
  const expectedHash = '0x25e4f59e5ad8dee3fcae5abe90fab18891c7b8ab55c9d690c87ff04bb6b44f21';

  it('generates correct asynchronous SHA-256 hash', async () => {
    const result = await sha256(testString);
    expect(result).toBe(expectedHash);
  });

  it('generates correct synchronous SHA-256 hash', () => {
    const result = sha256Sync(testString);
    expect(result).toBe(expectedHash);
  });

  it('generates deterministic HMAC-SHA256 signatures', async () => {
    const secret = 'system-secret';
    const message = 'test-message';
    const sig1 = await hmacSha256(secret, message);
    const sig2 = await hmacSha256(secret, message);
    
    expect(sig1).toBe(sig2);
    expect(sig1.length).toBe(66); // Hex representation with 0x prefix
  });

  it('generates strict length cryptographically secure random hex strings', () => {
    const r1 = secureRandomHex(16);
    const r2 = secureRandomHex(16);
    
    expect(r1).not.toBe(r2); // Extremely unlikely to collide
    expect(r1.length).toBe(32); // 16 bytes = 32 hex chars
  });
});
