/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'statics.mylandingpages.co',
        port: '',
        pathname: '/static/**',
      },
    ],
  },
}

module.exports = nextConfig