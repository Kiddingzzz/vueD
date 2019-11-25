module.exports = {
    proxy: {
      '/api': {
        target: 'https://openapi.fang.com/',  // 接口域名
        changeOrigin: true,  //是否跨域
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }