const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

module.exports = {
  watch: false,
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin( {
      //template: path.join( __dirname, './src/index.pug' ),
      filename: 'index.html',
      minify: true, // HTML MINIFY
      inject: 'body',
      meta: {
        format: { 
          charset: 'UTF-8',
        },
        responsive: { 
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        }
      },
    } ),
    /*new CopyPlugin( {
      patterns: [ { from: "src/assets", to: "assets" } ]
    } ),
    new HtmlWebpackTagsPlugin( {
      links: [ { path: 'assets/favicon.ico', attributes: { rel: 'icon' } } ]
    } ),*/
  ],
  entry: {
    App: [ './src/main.tsx' ],
  },
  output: {
    path: path.resolve( __dirname, './dist' ),
    filename: 'main.js'
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx' ], // IMPORTS
  },
  optimization: {
    minimize: true // JS & CSS MINIFY
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