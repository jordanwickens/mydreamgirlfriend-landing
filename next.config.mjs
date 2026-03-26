/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/features/relationship-stages',
        destination: '/features',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
