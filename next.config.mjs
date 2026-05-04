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
    // Next.js dev mode uses eval() for React Refresh (HMR). Allow 'unsafe-eval'
    // locally so client components hydrate, but keep the strict policy in prod.
    const isDev = process.env.NODE_ENV === "development";
    const scriptSrc = `'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`;
    const csp = `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-src https://www.youtube.com https://player.vimeo.com; media-src 'self'; object-src 'none'; base-uri 'self'`;

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
          { key: "Content-Security-Policy", value: csp },
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
