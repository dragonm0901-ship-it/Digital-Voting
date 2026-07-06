/**
 * Production-Grade Rate Limiting Module
 * 
 * Supports:
 * 1. Edge-compatible Upstash Redis REST API (prevents cross-instance bypass)
 * 2. Capped In-Memory fallback (prevents memory exhaustion under DDoS)
 * 3. Graceful fallback on network/Redis errors
 */

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Local Capped In-Memory Rate Limiter Configuration
const MAX_IN_MEMORY_KEYS = 5000;
const localLimitMap = new Map<string, { count: number; resetTime: number }>();

const LUA_RATE_LIMIT = `
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local current = tonumber(redis.call('get', key) or '0')
if current + 1 > limit then
  return {0, 0}
else
  local val = redis.call('INCRBY', key, 1)
  if val == 1 then
    redis.call('EXPIRE', key, window)
  end
  return {1, limit - val}
end
`.trim();

/**
 * Cleanup expired entries or clear old entries if map size exceeds limit
 */
function cleanLocalMemoryStore() {
  const now = Date.now();
  // Remove expired keys
  for (const [key, entry] of localLimitMap.entries()) {
    if (now > entry.resetTime) {
      localLimitMap.delete(key);
    }
  }

  // If still over capacity, evict randomly or clear to protect memory
  if (localLimitMap.size > MAX_IN_MEMORY_KEYS) {
    const keysToDelete = Array.from(localLimitMap.keys()).slice(0, Math.floor(MAX_IN_MEMORY_KEYS / 2));
    for (const key of keysToDelete) {
      localLimitMap.delete(key);
    }
  }
}

/**
 * Checks in-memory rate limit. Prevents memory leaks with strict sizing caps.
 */
function checkLocalMemoryRateLimit(
  ip: string,
  pathname: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const key = `${ip}:${pathname}`;
  const now = Date.now();

  // Enforce memory protection threshold
  if (localLimitMap.size >= MAX_IN_MEMORY_KEYS) {
    cleanLocalMemoryStore();
  }

  const entry = localLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    localLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

/**
 * Core Rate Limit Checker
 * 
 * @param ip Client IP Address
 * @param pathname API Pathname
 * @param limit Request threshold limit
 * @param windowSeconds Window length in seconds
 */
export async function checkRateLimit(
  ip: string,
  pathname: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${ip}:${pathname}`;
  const windowMs = windowSeconds * 1000;

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      // Edge-compatible fetch call to Upstash REST
      const response = await fetch(`${UPSTASH_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          'EVAL',
          LUA_RATE_LIMIT,
          '1',
          key,
          limit.toString(),
          windowSeconds.toString(),
        ]),
        // Prevents blocking/hanging middleware on external API latency
        signal: AbortSignal.timeout(2000), 
      });

      if (!response.ok) {
        throw new Error(`Upstash REST returned status ${response.status}`);
      }

      const resJson = await response.json();
      
      // Upstash responses for command execution return result in a "result" field
      if (resJson && Array.isArray(resJson.result)) {
        const allowed = resJson.result[0] === 1;
        const remaining = resJson.result[1];
        return { allowed, remaining };
      }
      
      throw new Error('Unexpected format returned from Upstash REST API');
    } catch (err) {
      // Fail-open to in-memory check so system stays alive if Redis provider is down
      console.warn('RATE_LIMIT_WARNING: Redis check failed. Falling back to secure in-memory.', err);
    }
  }

  // Fallback to local memory limiter
  return checkLocalMemoryRateLimit(ip, pathname, limit, windowMs);
}
