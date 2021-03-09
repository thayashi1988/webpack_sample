const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const webpack = require('webpack');

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = {
  dist: './dist/',
  src: './src/',
};

module.exports = [
  {
    mode: 'development',
    // watchOptions: {
    //   aggregateTimeout: 200,
    //   poll: 1000,
    // },
    // devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
      path: outputPath + '/js',
      publicPath: '/js/', // ホットリロードさせるためにbundle.jsの位置を指定
      // publicPath: '/', // ホットリロードさせるためにbundle.jsの位置を指定
      filename: 'bundle.js',
    },
    // devServer: {
    //   contentBase: outputPath,
    //   open: true,
    //   hot: true,
    //   watchContentBase: true,
    //   port: 8080,
    //   // publicPath: '/js',
    //   // watchOptions: {
    //   //   poll: true,
    //   // },
    //   // inline: true,
    // },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          // include: `src/ejs/`,
          use: ['ejs-easy-loader'],
        },
        // {
        //   test: /\.scss$/i,
        //   use: [
        //     {
        //       loader: MiniCssExtractPlugin.loader, // style-loaderの代わり
        //     },
        //     // 'style-loader',
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         // オプションでCSS内のurl()メソッドの取り込みを禁止する
        //         url: false,
        //         // 0 => no loaders (default);
        //         // 1 => postcss-loader;
        //         // 2 => postcss-loader, sass-loader
        //         importLoaders: 2,
        //       },
        //     },
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         postcssOptions: {
        //           plugins: [
        //             [
        //               'autoprefixer',
        //               {
        //                 grid: true,
        //               },
        //             ],
        //           ],
        //         },
        //       },
        //     },
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         // sourceMap: true,
        //         sassOptions: {
        //           outputStyle: 'expanded',
        //         },
        //       },
        //     },
        //   ],
        // },
        {
          // 拡張子 .js の場合
          // test: /\.js$/,
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          // use: [
          //   {
          //     loader: 'babel-loader',
          //     exclude: /node_modules/,
          //     options: {
          //       presets: [
          //         [
          //           // プリセットを指定することで、ES2020 を ES5 に変換
          //           '@babel/preset-env',
          //           {
          //             useBuiltIns: 'entry',
          //             corejs: { version: 3, proposals: false },
          //           },
          //         ],
          //       ],
          //     },
          //   },
          // ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: 'expanded',
                },
              },
            },
          ],
        },
      ],
    },
    // target: ['web', 'es5'],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist/'),
      publicPath: './dist',
      watchContentBase: true,
      hot: true,
      inline: true,
      open: true, //起動時にブラウザを開く
    },
    plugins: [
      // distファイルを一度削除
      new CleanWebpackPlugin({ verbose: true }),

      // ejsをhtmlファイルへ生成
      new HtmlWebpackPlugin({
        filename: '../index.html', // bundle.jsからの相対位置
        template: 'src/ejs/index.ejs',
        inject: false, // scriptタグの自動生成を外す
        minify: false, //minifyしない
        // alwaysWriteToDisk: true,
      }),

      // cssファイル生成
      new MiniCssExtractPlugin({
        filename: '../css/common.css',
      }),

      // 画像吐き出し先
      new CopyPlugin({
        patterns: [
          { from: 'src/img', to: '../img' },
          // { from: "./src/favicon.png", to: "favicon.png" },
          // { from: "./src/favicon.svg", to: "favicon.svg" },
        ],
      }),

      // 画像圧縮
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: '70-80',
        },
        gifsicle: {
          interlaced: false,
          optimizationLevel: 10,
          colors: 256,
        },
        svgo: {},
        plugins: [
          ImageminMozjpeg({
            quality: 85,
            progressive: true,
          }),
        ],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
];
