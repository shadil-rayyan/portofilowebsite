
import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isGithubActions ? '/shadil-portfolio/' : '',
  assetPrefix: isGithubActions ? '/shadil-portfolio/' : '',
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
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
