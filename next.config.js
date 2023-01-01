/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
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
            {
                protocol: "https",
                hostname: "openailabsprodscus.blob.core.windows.net",
            },
            {
                protocol: "https",
                hostname: "isitcompostable.com",
            },
            {
                protocol: "https",
                hostname: "cdn.shopify.com",
            },
        ],
    },
    experimental: {
        // This is experimental but can
        // be enabled to allow parallel threads
        // with nextjs automatic static generation
        workerThreads: false,
        cpus: 1,
    },
});
