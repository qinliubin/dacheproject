module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://tp6.com/index.php',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    },
}
