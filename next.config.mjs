/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "www.chunhojeil.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "placehold.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
    ],
  },
  env: {
    NAVER_API_CLIENT_ID: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
