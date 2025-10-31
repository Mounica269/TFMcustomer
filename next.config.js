/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'apidev.truefriendmatrimony.com','192.168.0.10','api-tfmss.azurewebsites.net','api.truefriendmatrimony.com', 'dev-tfmapiv4.azurewebsites.net'],
    // domains: ['localhost','apidev.truefriendmatrimony.com', 'dev-tfmapiv4.azurewebsites.net'],

  },
  // presets: ["next/babel"],
  // plugins: [
  //   [
  //     "react-form-stepper",
  //     {
  //       ssr: true,
  //       displayName: true,
  //       preprocess: false
  //     }
  //   ]
  // ]
}
module.exports = {
  env: {
    NEXT_PUBLIC_IS_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_IS_MAINTENANCE_MODE,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'truefriendmatrimony.com', 
          },
        ],
        destination: 'https://www.truefriendmatrimony.com/:path*',
        permanent: true,
      },
    ];
  },

};
module.exports = nextConfig
