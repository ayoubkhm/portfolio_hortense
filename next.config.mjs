/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // unoptimized: bypass next/image optimizer entirely.
    // Reason: Next.js scans public/ at build time and refuses to serve files
    // added afterward (returns 404 + /_next/image returns 400). Since Hortense
    // uploads images via /admin/* (which writes to public/uploads/ at runtime),
    // we MUST bypass the optimizer or her uploads stay invisible until the next deploy.
    // Nginx serves /uploads/* directly with cache (see nginx config on VPS).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-src https://www.youtube.com https://player.vimeo.com; media-src 'self'; object-src 'none'; base-uri 'self'" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/dev.db",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/dev.db-journal",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/:path*.db",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
