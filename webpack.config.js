const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const fs = require('fs');
const pages = fs.readdirSync(path.resolve(__dirname, 'src/pages'))
                .filter(fileName => fileName.endsWith('.html'));
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {  
  mode: 'production',
  entry: { // webpack.config.js  
    main: path.resolve(__dirname, './src/index.js'),  
  },  
   
  output: {  
     path: path.resolve(__dirname, './dist'),  
     filename: 'main.bundle.js',  
  },  
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
  },
  module: {  // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                     browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          }
        ],

      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: process.env.ASSET_IMAGES_PATH,
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: process.env.ASSET_FONT_PATH,
          },
        },
      },
    ]
  },
   plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    ...pages.map(page => new HtmlWebpackPlugin({
      filename: page,
      template: path.resolve(__dirname, `src/pages/${page}`),
    })),
  ], 

}  