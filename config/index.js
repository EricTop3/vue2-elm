// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {// production 环境
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../elm/index.html'),//编译输入的 index.html 文件 必须是本地文件系统上的路径。index.html (带着插入的资源路径) 会被生成。
        assetsRoot: path.resolve(__dirname, '../elm'), // 编译输出的静态资源路径 应该指向包含应用程序的所有静态资产的根目录
        assetsSubDirectory: 'static',//编译输出的二级目录 被webpack编译处理过的资源文件都会在这个build.assetsRoot目录下，所以它不可以混有其它可能在build.assetsRoot里面有的文件。例如，假如build.assetsRoot参数是/path/to/dist，build.assetsSubDirectory 参数是 static, 那么所以webpack资源会被编译到path/to/dist/static目录。每次编译前，这个目录会被清空，所以这个只能放编译出来的资源文件。static/目录的文件会直接被在构建过程中，直接拷贝到这个目录。这意味着是如果你改变这个规则，所有你依赖于static/中文件的绝对地址，都需要改变。
        assetsPublicPath: '/elm/',//编译发布的根目录，可配置为资源服务器域名或 CDN 域名 资源的根目录 这个是通过http服务器运行的url路径。在大多数情况下，这个是根目录(/)。如果你的后台框架对静态资源url前缀要求，你仅需要改变这个参数。在内部，这个是被webpack当做output.publicPath来处理的。
        productionSourceMap: true, // 是否开启 cssSourceMap
      //随着代码增多，我们需要对代码进行压缩。代码压缩后进行调bug定位将非常困难，于是引入sourcemap记录压缩前后的位置信息记录，
      // 当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,  // 是否开启 gzip
        productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
    },
    dev: { // dev 环境
        env: {
            NODE_ENV: '"development"'
        },
        port: 8088,//开发服务器监听的特定端口 // 运行测试页面的端口
        assetsSubDirectory: 'static', // 编译输出的二级目录
        assetsPublicPath: '/',         // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        context: [ //代理路径
            '/shopping',
            '/ugc',
            '/v1',
            '/v2',
            '/v3',
            '/v4',
            '/bos',
            '/member',
            '/promotion',
            '/eus',
        ],
        proxypath: 'https://mainsite-restapi.ele.me',// 需要 proxyTable 代理的接口（可跨域）
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false  // 是否开启 cssSourceMap
    }
}
