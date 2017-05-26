var path = require('path');
var webpack = require('webpack');
// 自动生成index.html页面插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取css文件的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 删除文件夹
var CleanPlugin = require('clean-webpack-plugin');

var webpackConfig ={
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
        // 分离第三方引用，比如var react= require('react')
        vendors: ['react', 'react-dom', 'react-router', 'jquery']
    },
    // 输出文件位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[name]_[chunkhash:8]_chunk.js'
    },
    // 配置加载器，加载器是在webpack真正编译之前先执行一些预处理操作
    module: {
        loaders: [
            // 处理jsx和es6语法的
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
                }
            },
            // 处理js中引用的css
            {
                test: /\.css$/, // Only .css files
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                //loader: 'style!css' // 如果同时用两个加载器那中间用！隔开，而且执行顺序是从右往左
            },
            // 处理sass文件
            {
                test: /\.scss$/,
                // css-loader和sass.loader文件必须连在一起写才可以抽离sass文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            // 处理图片的加载器
            {
                test: /\.(png|jpg)$/,
                // 如果图片的大小小于limit的限制大小，那webpack就会把图片装化为base64的字符串，添加在js文件中。否则就是图片路径
                // 单位是bit     1b=8bit   1kb=1024b   ~3kb
                // 用base64字符串就是为了减少网络请求，但是图片是有大小限制的，一般是小于3kb的才处理为base64
                // jpg和base64字符串本质都是010101010的机器码，所以可以相互转换
                // name属性可以控制大于3kb的图片的输出位置
                loader: 'url?limit=25000&name=img/[name].[ext]' // 如果在加载器后面加参数就用？号
            },
            // 处理字体
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'url'
            }
        ]
    },
    resolve: {
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        // 注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        extensions: ['', '.js', '.json', '.scss', '.jsx']
        // 模块别名定义，方便后续直接引用别名，无须多写长长的地址。后续直接 require('AppStore') 即可
        //alias: {
        //    AppStore: 'js/stores/AppStores.js',
        //    ActionType: 'js/actions/ActionType.js',
        //    AppAction: 'js/actions/AppAction.js'
        //}
    },
    // 在这个属性里面定义的包是不会被打包进bundle。js文件中的,如果你要用这个属性，别忘了在index。html中引入cdn
    //externals: {
    //    配置了这个属性之后react和react-dom这些第三方的包都不会被构建进js中，那么我们就需要通过cdn进行文件的引用了
    //    // 前边这个名称是在项目中引用用的，相当于import React from  ‘react1’中的react，
    //    //'react1':"react",
    //    'react1':"react",
    //    'react-dom1':"react-dom",
    //     '$1':"jQuery"
    //
    //},
    plugins: [
        new CleanPlugin(['dist']),
        // 分离第三方应用插件,name属性会自动指向entry中vendros属性，filename属性中的文件会自动构建到output中的path属性下面
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        // 可以新建多个抽离样式的文件，这样就可以有多个css文件了。
        new ExtractTextPlugin("app.css"),
        new webpack.DefinePlugin({
            //去掉react中的警告，react会自己判断
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // Cleanup the builds/ folder before
        // compiling our final assets
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["vendors.js","bundle.js"]
                }
            },
            // 效果不大，情怀至上
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        //new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        //当用户输入你应用的地址的时候，他们需要去下载不同的资源，比如 CSS、JavaScript、HTML、图片和字体。不过 Webpack 做了一件事情，让你不用去考虑如何不用下载全部资源。
        //new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        //new webpack.optimize.MinChunkSizePlugin({
        //    minChunkSize: 51200, // ~50kb
        //})
    ]
}

// 动态添加插件
// 丑化压缩文件插件,相当于-p
webpackConfig.plugins.push(
    // 用webpack压缩代码，可以忽略代码中的警告
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);


module.exports=webpackConfig;

