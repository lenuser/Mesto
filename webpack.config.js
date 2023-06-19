const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
   devServer: {
      static: path.resolve(__dirname, './dist'), 
      compress: true, 
      port: 8080, 
      open: true 
    },
     
    module:{
      rules:[
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: '/node_modules/',
        },
        {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: { importLoaders: 1 },
      }, 'postcss-loader'],
    }, 

    {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
    generator:{
      filename: 'images/[name].[hash][ext]',
    }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator:{
        filename:'fonts/[name].[hash][ext]',
      }
      }
      ],
      
    },
    
    plugins: [
      new CleanWebpackPlugin (),
      new HtmlWebpackPlugin ({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename:'./index.css'
      }),
    ]
  };