/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
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
