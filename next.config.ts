import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',

    compress: true,

    experimental: {
        optimizePackageImports: ['antd'],
    },

    images: {
        formats: ['image/avif', 'image/webp'],
    },
    
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Vary",
                        value: "Accept-Encoding",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;