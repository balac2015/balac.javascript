const path = require('path')
const merge = require('webpack-merge')
const plugin = require('./plugin')
const { getPages } = require('./utils')

const baseWebpackConfig = require('./webpack.base.config')

const entry = {}
const htmls = []
const pages = getPages(path.resolve('src'))

pages.forEach(page => {
  entry[page.id] = page.entry

  page.template = path.resolve('index.html')
  page.filename = 'html/' + page.id + '.html'
  page.chunks = ['runtime', 'vendors', 'commons', page.id]

  htmls.push(plugin.html(page))
})

const webpackConfig = {
  mode: 'production',
  entry: entry,
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  optimization: {
    minimizer: [
      plugin.uglify(),
      plugin.optimizeCSS()
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 30000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1
        },
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons',
          minSize: 30000,
          minChunks: 3,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    plugin.merge(),
    plugin.hash(),
    plugin.extractCSS(),
    plugin.analyzer({
      filename: '../.cache/report.build.html'
    })
  ].concat(htmls, [
    plugin.inlineManifest()
  ]),
  externals: {}
}

module.exports = merge(
  baseWebpackConfig,
  webpackConfig
)
