//next.config.js
const {
  PHASE_PRODUCTION_BUILD,
  PHASE_DEVELOPMENT_SERVER
} = require("next/constants");

const path = require("path");
const webpack = require("webpack");
module.exports = {
  cssLoaderOptions: {
    url: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    loader: "imgix",
    path: "/"
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  compress: false,
  webpack5: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const env = dev ? "development" : "production";
    console.log(dev, "dev");
    config.resolve.fallback = { fs: false, path: false };
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: ["css-loader"]
    // });
    // config.plugins.push(
    //   new webpack.EnvironmentPlugin(
    //     require("dotenv").config({
    //       path: path.resolve(__dirname, `./.env.${env}`)
    //     }).parsed
    //   )
    // );
    return config;
  }
};
