/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.116', '100.69.50.40'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
