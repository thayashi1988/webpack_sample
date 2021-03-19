/* eslint-disable quotes */
/* eslint-disable no-console */
// settings
const path = require("path");
const outputPath = path.resolve(__dirname, "dist");
const webpack = require("webpack");
console.log("outputPath:", outputPath);

//plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// paths
const paths = {
  dist: "./dist/",
  src: "./src/",
};

module.exports = [
  {
    mode: "development",
    // devtool: 'source-map',
    entry: "./src/assets/js/index.js",
    output: {
      path: outputPath + "/assets/js",
      publicPath: "/assets/js/", // ホットリロードさせるためにbundle.jsの位置を指定
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          // include: `src/ejs/`,
          use: ["ejs-easy-loader"],
        },
        {
          // 拡張子 .js の場合
          // test: /\.js$/,
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
              },
            },
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  outputStyle: "expanded",
                },
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist/"),
      publicPath: "./dist",
      watchContentBase: true,
      hot: true,
      inline: true,
      open: true, //起動時にブラウザを開く
    },
    // target: ['web', 'es5'],
    target: "web", // webだけにしないとリロードが起動しない
    plugins: [
      // distファイルを一度削除
      new CleanWebpackPlugin({ verbose: true }),

      // ejsをhtmlファイルへ生成
      new HtmlWebpackPlugin({
        filename: "../../index.html", // bundle.jsからの相対位置
        template: "src/ejs/index.ejs",
        inject: false, // scriptタグの自動生成を外す
        minify: false, //minifyしない
        // alwaysWriteToDisk: true,
      }),

      // cssファイル生成
      new MiniCssExtractPlugin({
        filename: "../css/common.css",
      }),

      // 画像吐き出し先
      new CopyPlugin({
        patterns: [
          { from: "src/assets/img", to: "../img" },
          // { from: './src/favicon.png', to: 'favicon.png' },
          // { from: './src/favicon.svg', to: 'favicon.svg' },
        ],
      }),

      // 画像圧縮
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: "70-80",
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
      // リロードのためのプラグイン
      new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(), // CSSのminifyを行う
      ],
    },
  },
];
