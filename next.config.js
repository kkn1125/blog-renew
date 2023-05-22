const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "export",
  swcMinify: true,
  // reactStrictMode: true,
  experimental: {
    mdxRs: true,
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    return config;
  },
  transpilePackages: ["react-syntax-highlighter"],
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
};

module.exports = withMDX(nextConfig);
