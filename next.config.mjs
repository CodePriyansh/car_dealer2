/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['firebasestorage.googleapis.com'],
      },
      reactStrictMode: false,
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
  eslint: {ignoreDuringBuilds: true},

};

export default nextConfig;
