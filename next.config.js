/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'upload.wikimedia.org', 
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'flagcdn.com'
      }
    ],
  },
}
