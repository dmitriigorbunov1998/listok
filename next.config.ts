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
    async rewrites() {
        return [
            // Перенаправляем все запросы на клиентский роутинг
            {
                source: '/task/:taskId',
                destination: '/task/:taskId',
            },
        ];
    },
};

export default nextConfig;
