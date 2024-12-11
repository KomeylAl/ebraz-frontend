/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
           protocol: "https",
           hostname: "**",
         },
         {
            protocol: "http",
            hostname: "127.0.0.1"
         }
       ],
   },
   typescript: {
      ignoreBuildErrors: true
   },
   eslint: {
      ignoreDuringBuilds: true
   }
};

export default nextConfig;
