const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: outputPath + '/js',
    publicPath: '/js', // ホットリロードさせるためにbundle.jsの位置を指定
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: outputPath,
    open: true,
    // inline: true,
    hot: true,
    // watchContentBase: true,
    // port: 8080,
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // exclude: /node_modules/,
            // Babel のオプションを指定する
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
              // plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
    ],
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  // ],
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/  //正規表現で指定（node_modules を除外）
  // }
};
