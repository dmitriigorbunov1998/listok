import { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
