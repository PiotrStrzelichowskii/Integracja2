/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Napraw problem z __next_error__
  generateEtags: false,
  poweredByHeader: false,
  // Napraw problemy z dostępnością
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  compiler: {
    // Usuń console.log w produkcji
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig

