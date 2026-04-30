import type { NextConfig } from "next";

/**
 * Security Headers for MATDAAN National Voting Platform
 *
 * These headers protect against:
 * - XSS (Content-Security-Policy)
 * - Clickjacking (X-Frame-Options, frame-ancestors)
 * - MIME sniffing (X-Content-Type-Options)
 * - Protocol downgrade (Strict-Transport-Security)
 * - Referrer leakage (Referrer-Policy)
 * - Unauthorized API usage (Permissions-Policy)
 */
const isDev = process.env.NODE_ENV === 'development';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' blob: data:;
  connect-src 'self'${isDev ? ' ws://localhost:*' : ''};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isDev ? '' : 'upgrade-insecure-requests;'}
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  // Content Security Policy — primary XSS defense
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  // Force HTTPS for 2 years, include subdomains, allow HSTS preload
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent clickjacking — page cannot be embedded in iframes
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Prevent MIME-type sniffing attacks
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control referrer information leakage
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable unnecessary browser features for a voting platform
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',        // No camera access needed
      'microphone=()',    // No microphone access needed
      'geolocation=()',   // No precise location needed (geo-fencing is server-side)
      'interest-cohort=()', // Block FLoC tracking
      'payment=()',       // No payments
      'usb=()',           // No USB access
      'bluetooth=()',     // No Bluetooth
    ].join(', '),
  },
  // Enable DNS prefetching for faster navigation
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Custom header identifying the platform
  {
    key: 'X-Powered-By',
    value: 'MATDAAN National Election Infrastructure',
  },
];

const nextConfig: NextConfig = {
  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Stricter headers for API routes
      {
        source: '/api/:path*',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
    ];
  },

  // Powered-by header is handled above with custom value
  poweredByHeader: false,

  // Enable experimental SRI for hash-based CSP integrity
  experimental: {
    sri: {
      algorithm: 'sha256',
    },
  },
};

export default nextConfig;
