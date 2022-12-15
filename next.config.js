/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
                fs: false,
                path: false,
                os: false,
            },
        };
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.publicdomainpictures.net",
            },
            {
                protocol: "https",
                hostname: "**.wikimedia.org",
            },
        ],
    },
};

module.exports = nextConfig;
