const path = require('path')
const { ProvidePlugin } = require('webpack')
const _ESLintPlugin = require('eslint-webpack-plugin')
const _MiniCssExtractPlugin = require('mini-css-extract-plugin')
const _StyleLintPlugin = require('stylelint-webpack-plugin')
const _SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const ESLintPlugin = new _ESLintPlugin({
  overrideConfigFile: path.resolve(__dirname, '../.eslintrc'),
  context: path.resolve(__dirname, './storybook'),
  files: '*.js',
})

const MiniCssExtractPluginDev = new _MiniCssExtractPlugin({
  filename: '[name].css',
})

const MiniCssExtractPluginProd = new _MiniCssExtractPlugin({
  filename: '[name].[contenthash:8].min.css',
})

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, '../.stylelintrc'),
  context: path.resolve(__dirname, '../storybook'),
  files: '*.scss',
})

const SpriteLoaderPlugin = new _SpriteLoaderPlugin({
  plainSprite: true,
})

module.exports = {
  ESLintPlugin,
  MiniCssExtractPluginDev,
  MiniCssExtractPluginProd,
  StyleLintPlugin,
  SpriteLoaderPlugin,
  ProvidePlugin: new ProvidePlugin({
    React: 'react',
    process: 'process/browser',
  }),
}
