/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
       runtime: 'experimental-edge',
  },
  reactStrictMode: true,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-dev.infoimoveis.com.br',
      },
    ],
  },

}


module.exports = nextConfig
