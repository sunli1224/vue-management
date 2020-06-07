module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        utils: '@/utils',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        data: '@/data',
        permission: '@/permission',
        excel: '@/excels'
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {
      '/auth-user-provider': {
        target: 'http://127.0.0.1:9786',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/auth/user': ''
        }
      },
      '/nacos-user-provider': {
        target: 'http://127.0.0.1:9786',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/nacos-user-provider/*': ''
        }
      }
    }

  }
}
