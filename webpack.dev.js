const path = require( 'path' )

const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

module.exports = {
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
    minimize: false // JS & CSS MINIFY
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  }
}