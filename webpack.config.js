const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = {
  dist: './dist/',
  src: './src/',
};

module.exports = [
  {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
      path: outputPath + '/js',
      publicPath: '/js', // ホットリロードさせるためにbundle.jsの位置を指定
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: outputPath,
      open: true,
      hot: true,
      // inline: true,
      watchContentBase: true,
      // port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          // include: `src/ejs/`,
          use: ['ejs-easy-loader', 'html-loader'],
        },
        {
          // 拡張子 .js の場合
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              // exclude: /node_modules/,
              options: {
                presets: [
                  [
                    // プリセットを指定することで、ES2020 を ES5 に変換
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'entry',
                      corejs: { version: 3, proposals: false },
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: '../top.html', // bundle.jsからの相対位置
        template: 'src/ejs/index.ejs',
        // alwaysWriteToDisk: true,
      }),
    ],
  },
];
