const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const SCSSLoaderDev = {
  test: /\.(scss|css)$/,
  // exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, 'postcss.dev.config.js'),
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
}

const SCSSLoaderProd = {
  test: /\.(scss|css)$/,
  // exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, 'postcss.prod.config.js'),
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
}

const FontsLoader = {
  test: /\.(woff|woff2)$/,
  type: 'asset/resource',
}

const JSLoader = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'esbuild-loader',
    options: {
      loader: 'jsx',
      target: 'es2017',
    },
  },
}

const SVGLoader = {
  test: /icons\/.*\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        publicPath: 'img/icons/',
        spriteFilename: (svgPath) => `icons${svgPath.substr(-4)}`,
        symbolId: (filePath) => `icon-${path.basename(filePath).slice(0, -4)}`,
      },
    },
    {
      loader: 'svgo-loader',
    },
  ],
}

module.exports = {
  FontsLoader,
  JSLoader,
  SCSSLoaderDev,
  SCSSLoaderProd,
  SVGLoader,
}
