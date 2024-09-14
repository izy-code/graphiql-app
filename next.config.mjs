/** @type {import('next').NextConfig} */
import path from 'node:path';

const nextConfig = {
  reactStrictMode: true,
  distDir: './dist',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@codemirror/state': path.resolve('./node_modules/@codemirror/state/dist/index.cjs'),
    };
    return config;
  },
};

export default nextConfig;
