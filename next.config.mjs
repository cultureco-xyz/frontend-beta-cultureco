/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "817174432063-mtvlsvcn3aiv448m49se34sj1lt73n8d.apps.googleusercontent.com",
        NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID
    },
    async rewrites() {
        return [
            {
                source: '/backend/:path*',
                destination: `${process.env.BACKEND_URL || "https://api.cultureco.xyz"}/:path*`,
            },
        ];
    },
};

export default nextConfig;
