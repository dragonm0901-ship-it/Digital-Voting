/**
 * Next.js Proxy (formerly Middleware) — Security Layer
 *
 * In Next.js 16, the `middleware.ts` convention was renamed to `proxy.ts`.
 * This file runs on every request BEFORE routes are rendered.
 *
 * Responsibilities:
 * 1. Rate limiting on API routes (prevents brute-force OTP attacks)
 * 2. Request logging for audit trail
 * 3. CSRF protection on mutation endpoints
 * 4. Admin route protection (basic auth gate for /admin/*)
 * 5. API route CORS handling
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { checkRateLimit } from './lib/rate-limit';

if (!process.env.JWT_SECRET) {
  throw new Error("CRITICAL SECURITY ERROR: JWT_SECRET environment variable is missing!");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// ─── Rate Limit Configurations ──────────────────────────────────────────────
const RATE_LIMIT_WINDOW_SECONDS = 60; // 1 minute window
const RATE_LIMITS = {
  '/api/auth/verify-otp': 5,    // 5 OTP attempts per minute (prevents brute-force)
  '/api/auth/verify-voter': 10, // 10 voter lookups per minute
  '/api/vote/cast': 3,          // 3 vote attempts per minute (generous for retries)
  default: 60,                   // 60 requests per minute for other endpoints
};

function getRateLimit(pathname: string): number {
  for (const [path, limit] of Object.entries(RATE_LIMITS)) {
    if (path !== 'default' && pathname.startsWith(path)) return limit;
  }
  return RATE_LIMITS.default;
}


// ─── Main Proxy Function ────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 1. Add request ID for tracing
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-Id', requestId);

  // 2. Rate limiting on API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const limit = getRateLimit(pathname);
    const { allowed, remaining } = await checkRateLimit(ip, pathname, limit, RATE_LIMIT_WINDOW_SECONDS);

    response.headers.set('X-RateLimit-Remaining', String(remaining));
    response.headers.set('X-RateLimit-Limit', String(limit));

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'TOO_MANY_REQUESTS',
          message: 'Rate limit exceeded. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(RATE_LIMIT_WINDOW_SECONDS),
            'X-Request-Id': requestId,
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // 3. CSRF protection on mutation endpoints (POST, PUT, DELETE)
    if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
      const origin = request.headers.get('origin');
      const host = request.headers.get('host');

      // In production, validate origin matches the expected domain
      if (origin && host) {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json(
            {
              success: false,
              error: 'CSRF_VIOLATION',
              message: 'Cross-origin request blocked.',
            },
            { status: 403, headers: { 'X-Request-Id': requestId } }
          );
        }
      }
    }
  }

  // 4. Admin Auth Gate
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 5. Log API requests (structured logging for audit trail)
  if (pathname.startsWith('/api/')) {
    const timestamp = new Date().toISOString();
    const method = request.method;
    // In production, this would go to a log aggregation service
    console.log(
      JSON.stringify({
        level: 'info',
        type: 'api_request',
        requestId,
        timestamp,
        method,
        pathname,
        userAgent: request.headers.get('user-agent')?.substring(0, 100),
      })
    );
  }

  return response;
}

// ─── Matcher Configuration ──────────────────────────────────────────────────
// Only run proxy on routes that need it (API routes + admin pages)
// Skip static files, images, and prefetches for performance

export const config = {
  matcher: [
    // Match API routes
    '/api/:path*',
    // Match admin pages
    '/admin/:path*',
    // Match voting flow pages (for future session validation)
    {
      source: '/vote/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
