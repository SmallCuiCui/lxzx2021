module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: 'http://localhost:8888',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                  }
            }
        }
    },
    pwa:{
        iconPaths:{
            favicon32:'./public/img/favicon.ico',
            favicon16:'./public/img/favicon.ico',
            appleTouchTcom:'./public/img/favicon.ico',
            maskIcon:'./public/img/favicon.ico',
            msTileImage:'./public/img/favicon.ico'
        }
    }
}