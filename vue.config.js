const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  filenameHashing: false,
  configureWebpack: {
    devtool: false,
    resolve: {
      alias: {
        moment: 'moment/src/moment'
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          app: {
            chunks: "all",
            name: "main"
          },
          // Merge all the CSS into one file
          styles: {
            name: 'styles',
            test: /\.s?css$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true,
          }
        }
      }
    }
  }
};
