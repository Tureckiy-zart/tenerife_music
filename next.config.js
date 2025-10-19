const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  output: process.env.NEXT_OUTPUT_MODE,
  experimental: {
    // outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.abacus.ai' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'www.opodo.co.uk' },
      { protocol: 'https', hostname: 'estaticos-cdn.prensaiberica.es' },
      { protocol: 'https', hostname: 'www.auditoriodetenerife.com' },
      { protocol: 'https', hostname: 'welikecanarias.com' },
      { protocol: 'https', hostname: 'mindtrip.ai' },
      { protocol: 'https', hostname: 'tcdn.mindtrip.ai' },
      { protocol: 'https', hostname: 'c8.alamy.com' },
      { protocol: 'https', hostname: 'whenincanarias.wordpress.com' },
      { protocol: 'https', hostname: 'dynamic-media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'i3.wp.com' },
      { protocol: 'https', hostname: 'canaryvip.com' },
      { protocol: 'https', hostname: 'a.storyblok.com' }
    ],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
      "font-src 'self' https: data:",
      "connect-src 'self' https:",
      "object-src 'none'",
      "form-action 'self'"
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
