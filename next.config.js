/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'experimental-edge',
  },
 
  reactStrictMode: true,
  swcMinify: false,
  images: {
    unoptimized: true
  },

}


module.exports = nextConfig
