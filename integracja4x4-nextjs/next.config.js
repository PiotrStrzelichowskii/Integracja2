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
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  // Napraw problem z __next_error__
  generateEtags: false,
  poweredByHeader: false,
  compiler: {
    // Usuń console.log w produkcji
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  // Optymalizacja dla nowoczesnych przeglądarek
  transpilePackages: [],
  // Zmniejsz rozmiar bundle'a
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optymalizacja dla produkcji
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
          ui: {
            test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 8,
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig

