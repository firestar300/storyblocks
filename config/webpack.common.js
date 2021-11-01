const loaders = require('./loaders')
const plugins = require('./plugins')

module.exports = {
  module: {
    rules: [loaders.FontsLoader, loaders.JSLoader],
  },
  plugins: [plugins.ESLintPlugin, plugins.ProvidePlugin, plugins.SpriteLoaderPlugin, plugins.StyleLintPlugin],
}
