import crypto from 'node:crypto';
import util from 'node:util';

// Polyfill for text encoder/decoder if running in a strict environment
if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = util.TextEncoder;
}
if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = util.TextDecoder as unknown as typeof globalThis.TextDecoder;
}

// In Node 24 crypto is usually global, but just in case:
if (!globalThis.crypto || !globalThis.crypto.subtle) {
  Object.defineProperty(globalThis, 'crypto', {
    value: crypto.webcrypto,
  });
}

// Default environment variables for database and JWT secrets under Jest test environment
process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";
process.env.JWT_SECRET = process.env.JWT_SECRET || "matdaan_development_secret_key_change_in_production";
