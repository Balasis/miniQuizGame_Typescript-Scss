const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname , 'build'),
    publicPath: '/build/',
    filename: 'app.js'    
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {      
      directory: path.resolve(__dirname, './'),
    },
    compress: true,
    port: 9000,
  },
};