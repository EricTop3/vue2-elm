// https://github.com/shelljs/shelljs
require('shelljs/global') // 使用了 shelljs 插件，可以让我们在 node 环境的 js 中使用 shell
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')// 加载 config.js
var ora = require('ora')// 一个很好看的 loading 插件
var webpack = require('webpack')// 加载 webpack
var webpackConfig = require('./webpack.prod.conf')// 加载 webpack.prod.conf

var spinner = ora('building for production...')// 使用 ora 打印出 loading + log
spinner.start()// 开始 loading 动画
/* 拼接编译输出文件路径 */
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)/* 删除这个文件夹 （递归删除） */
mkdir('-p', assetsPath)/* 创建此文件夹 */
cp('-R', 'static/*', assetsPath)/* 复制 static 文件夹到我们的编译输出目录 */

webpack(webpackConfig, function(err, stats) {
  // 编译成功的回调函数
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
