/**  @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },
};

import withVideos from 'next-videos';

export default withVideos(nextConfig);
