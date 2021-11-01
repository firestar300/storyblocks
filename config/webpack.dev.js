const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const loaders = require('./loaders')
const plugins = require('./plugins')

module.exports = merge(common, {
  mode: 'development',
  stats: 'errors-only',
  devtool: 'inline-source-map',
  module: {
    rules: [loaders.SCSSLoaderDev, loaders.SVGLoader].concat(common.module.rules),
  },
  plugins: [plugins.MiniCssExtractPluginDev],
})
