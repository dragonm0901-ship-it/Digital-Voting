import cryptoNode from 'crypto';

/**
 * SHA-256 Hashing Utility — Production-Grade
 *
 * Uses the Web Crypto API (crypto.subtle) for real SHA-256 hashing.
 * Works in both browser and Node.js 18+ environments.
 *
 * This replaces the toy Math.imul-based hash that was used in the PoC.
 */

const encoder = new TextEncoder();

/**
 * Computes a SHA-256 hash of the input string.
 * Returns the hash as a hex string prefixed with "0x".
 *
 * @example
 *   await sha256("hello") // "0x2cf24dba5fb0a30e..."
 */
export async function sha256(data: string): Promise<string> {
  const encoded = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `0x${hashHex}`;
}

/**
 * Computes SHA-256 of raw bytes (Uint8Array).
 * Useful for hashing concatenated binary data in Merkle tree construction.
 */
export async function sha256Bytes(data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data as unknown as BufferSource);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `0x${hashHex}`;
}

/**
 * Synchronous SHA-256 using Node.js crypto module.
 * Fallback for server-side contexts where crypto.subtle may behave differently.
 * Returns hex string prefixed with "0x".
 */
export function sha256Sync(data: string): string {
  if (typeof cryptoNode?.createHash === 'function') {
    return '0x' + cryptoNode.createHash('sha256').update(data).digest('hex');
  }
  throw new Error('sha256Sync requires Node.js crypto available. Use sha256() in browsers.');
}

/**
 * Generates a cryptographically secure random hex string.
 * Used for salts, nonces, and non-deterministic components.
 *
 * @param byteLength Number of random bytes (output hex will be 2x this length)
 */
export function secureRandomHex(byteLength: number = 32): string {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * HMAC-SHA256 for keyed hashing.
 * Used for generating deterministic nullifiers from voter secrets.
 */
export async function hmacSha256(key: string, data: string): Promise<string> {
  const keyEncoded = encoder.encode(key);
  const dataEncoded = encoder.encode(data);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyEncoded,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataEncoded);
  const sigArray = Array.from(new Uint8Array(signature));
  return `0x${sigArray.map(b => b.toString(16).padStart(2, '0')).join('')}`;
}
