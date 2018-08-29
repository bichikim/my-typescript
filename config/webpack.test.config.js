const WebpackBaseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
const Webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
//  karma test won't ues entry
process.env.NODE_ENV = 'test'
WebpackBaseConfig.entry = null
module.exports = webpackMerge(WebpackBaseConfig, {
  target: 'node',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  /**
   * Test in this project needs development
   * For more info See this
   * @link https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
   */
  mode: 'development',
  // for webpack karma debug
  devtool: 'inline-cheap-module-source-map', // 'inline-source-map',
  module: {
    rules: [
      // {
      //   test: /\.(js|ts|vue)$/,
      //   use: {
      //     // for coverage
      //     loader: 'istanbul-instrumenter-loader',
      //     options: {esModules: true},
      //   },
      //   enforce: 'post',
      //   exclude: /node_modules|\.spec\.(js|ts)$/,
      // },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
    }),
  ],
  externals: [nodeExternals()],
})
