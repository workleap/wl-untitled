const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    experimental: {
        appDir: true
    },
    transpilePackages: ['@hopper-ui'],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.workleap-dev.com",
                port: "",
                pathname: "/hopper/**"
            }
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ["@svgr/webpack"]
        });

        return config;
    }
};

module.exports = withContentlayer(nextConfig);
