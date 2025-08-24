
import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repoName = 'shadil-portfolio';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',


  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '**' as const,
      },
    ],
  },
};

export default nextConfig;
