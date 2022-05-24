const path = require( 'path' )
const fs = require( 'fs' )

const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' )
const TerserPlugin = require( 'terser-webpack-plugin' )
const CopyPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackTagsPlugin = require( 'html-webpack-tags-plugin' )
const BeautifyHtmlWebpackPlugin = require( 'beautify-html-webpack-plugin' )
const HtmlBeautifyPlugin = require( 'html-beautify-webpack-plugin' )


var MODULE = {
  watch: false,
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin( {
      //template: path.join( __dirname, './src/index.pug' ),
      filename: 'index.html', // HTML OUTPUT 
      //minify: MODE == 'production' ? true : false, // HTML MINIFY
      minify: {
        removeComments: true,
        //removeEmptyElements: false,
        //collapseWhitespace: true // minify HTML
      },
      inject: 'body',
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ]
    } ),

  ],
  entry: {
    App: [ './src/main.tsx' ],
  },
  output: {
    path: path.resolve( __dirname, './dist' ),
    filename: 'main.js' // JS OUTPUT
  },
  resolve: {
    extensions: [ '.tsx', '.js', '.jsx', '.ts' ], // IMPORTS
    modules: [
      path.resolve( __dirname, 'node_modules' ),
      path.resolve( __dirname, './' )
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin( ),
      new CssMinimizerPlugin( )
    ],
    minimize: false // JS & CSS MINIFY
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
      }
    ]
  }
}


module.exports = MODULE