var path = require('path')
var config = require('../config') // 获取配置
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
//随着代码增多，我们需要对代码进行压缩。代码压缩后进行调bug定位将非常困难，于是引入sourcemap记录压缩前后的位置信息记录，
// 当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)/* 是否在 dev 环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)/* 是否在 production 环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd/* 最终是否使用 cssSourceMap */


module.exports = {
    entry: {// 配置webpack编译入口
        app: './src/main.js'
    },
    output: {// 配置webpack输出路径和命名规则
        path: config.build.assetsRoot,// webpack输出的目标文件夹路径（例如：/dist）
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // webpack编译输出的发布路径(判断是正式环境或者开发环境等)
        filename: '[name].js'  // webpack输出bundle文件命名格式，基于文件的md5生成Hash名称的script来防止缓存
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],//自动解析确定的拓展名,使导入模块时不带拓展名
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {// 创建import或require的别名，一些常用的，路径长的都可以用别名
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,// vue文件后缀
            loader: 'vue'   //使用vue-loader处理
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {// .vue 文件配置 loader 及工具 (autoprefixer)
        loaders: utils.cssLoaders({
            sourceMap: useCssSourceMap// 调用cssLoaders方法返回各类型的样式对象(css: loader)
        }),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 10 versions']
            })
        ]
    }
}
