const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader','css-loader','sass-loader'];
const cssProd = ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader', 
                    publicPath: '/dist'
                });
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
module.exports = {
    entry: {
        app: './src/app.js',
        bootstrap: bootstrapConfig
        /*
        add new scripts for different pages here (ie another: './src/another.js')
        */
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {   test: /\.scss$/, 
                exclude: /node_modules/,
                use: cssConfig
            },
            {   test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=assets/',
                    'image-webpack-loader'
                ]
            },
            { 
                test: /\.(woff2?|svg)$/, 
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
            },
            { 
                test: /\.(ttf|eot)$/, 
                loader: 'file-loader?name=fonts/[name].[ext]' 
            },
            { 
                test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, 
                loader: 'imports-loader?jQuery=jquery' 
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname,"dist"),
        compress: true,
        port: 9000,
        stats: 'errors-only',
        open: true,
        hot: true
    },
    plugins: [  new HtmlWebpackPlugin({
    title: 'Project',
    minify: {
        collapseWhitespace: false //isProd (if you want to minify the html during production)
    },
    /*
        the array contains scripts that you don't want to include in your html file.
    */
    //excludeChunks: [''],
    hash: true,
    template: './src/index.html',
    }), 

    /*
    **If you need to create another page, you can do so by creating a new HtmlWebpackPlugin object
    **and specifying the options below.

    new HtmlWebpackPlugin({
        title: 'Another Page',
        // minify: {
        //     collapseWhitespace: true
        // },
        hash: true,

        **Opposite of excludeChunks, you can put the scripts that you want to include in your html file
        **in the chunks array.
        chunks: ['another', 'bootstrap'],
        filename: 'another.html',
        template: './src/another.html',
    }),

    to learn more about the plugin, visit: https://github.com/jantimon/html-webpack-plugin
    */

    //for your stylesheets.
    new ExtractTextPlugin({
      filename: "/css/[name].css",
      disable: !isProd,
      allChunks: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*.html'))
    }),

    /*
    your third-party plugins, frameworks and libraries go here. make sure you've installed them
    with npm install first.
    */
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })
  ]
}