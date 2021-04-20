const webpack = require('webpack')
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/pc/css/common.css',
    'mint-ui/lib/style.css',
    'vue-swipe/dist/vue-swipe.css',
    'video.js/dist/video-js.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/api.request',
    { src: '@/plugins/svg-icon', ssr: true },
    { src: '~/plugins/mint-ui', ssr: true },
    { src: '~/plugins/vue-swipe', ssr: false },
    { src: '~/plugins/common.js', ssr: false },
    { src: '~/plugins/vant.js', ssr: true },
    { src: "~plugins/map.js", ssr: false },
    { src: "~plugins/router.js", ssr: false },
    { src: "~plugins/preview.js", ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  /*
  ** Nuxt.js modules
  */
  router: {
    middleware: ["device"]
  },
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true,
    prefix: '/api',
    credentials: true
  },
  server: {
    // port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  proxy: {
    '/api': {
      // target: 'http://127.0.0.1:1314',
      // target: 'http://172.16.127.188:1314',
      // target: 'http://172.16.127.5:1314',
      target: 'http://172.16.127.65:1314',
      secure: false,
      changeOrigin: false,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '$' : 'jquery'
      })
    ],
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
        let path = require('path')
        const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
        svgRule.exclude = [path.resolve(__dirname, 'assets/icons/svg')]
        // Includes /icons/svg for svg-sprite-loader
        config.module.rules.push({
          test: /\.svg$/,
          include: [path.resolve(__dirname, 'assets/icons/svg')],
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          },
        })
    },
    optimization: {},
    /**
     * 打包独立css文件
     */
    extractCSS: true
  }
}
