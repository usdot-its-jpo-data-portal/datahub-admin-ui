const webpack = require('webpack')
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: process.env.VUE_APP_ADMIN_API_URL,
        secure: false
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_PACKAGE_VERSION: '"'+version+'"'
        }
      })
    ]
  },
}
