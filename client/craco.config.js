const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  babel: {
    loaderOptions: {
      ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
    },
  },
  webpack: {
    plugins: process.env.NODE_ENV === "production" && [
      new BundleAnalyzerPlugin({ analyzerMode: "server" }),
    ],
  },
};
