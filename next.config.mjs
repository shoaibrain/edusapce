/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: {
      allowedOrigins: ["app.localhost:3000"],
    },
  },
}

export default nextConfig
