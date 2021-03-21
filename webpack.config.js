/* eslint-disable quotes */
/* eslint-disable no-console */
// settings
const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
console.log(env === 'development' ? 'eval-source-map' : false,);

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

// paths
const paths = {
  dist: path.resolve(__dirname, 'dist'),
  src: './src/',
};

module.exports = [
  {
    mode: 'development',
    devtool: env === 'development' ? 'eval-source-map' : false,
    entry: {
      index: './src/assets/js/index.js'
      // index2: './src/assets/js/index.js'
    },
    output: {
      path: outputPath + '/assets/js',
      publicPath: '/assets/js/', // ホットリロードさせるためにbundle.jsの位置を指定
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          // include: `src/ejs/`,
          use: ['ejs-easy-loader'],
        },
        {
          // 拡張子 .js の場合
          // test: /\.js$/,
          test: /\.js$/,
          exclude: /node_modules/,
          // loader: "babel-loader",
          use: {
            loader: 'babel-loader',
            // options: {
            //   presets: [
            //     [
            //       "@babel/preset-env",
            //       {
            //         useBuiltIns: 'usage',
            //         corejs: 3
            //       }
            //     ]
            //   ]
            // }
          },
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
    devServer: {
      contentBase: `${outputPath}/`,
      publicPath: './dist',
      watchContentBase: true,
      hot: true,
      inline: true,
      open: true, //起動時にブラウザを開く
    },
    // target: ['web', 'es5'],
    target: 'web', // webだけにしないとリロードが起動しない
    plugins: [
      // distファイルを一度削除
      new CleanWebpackPlugin({ verbose: true }),

      // ejsをhtmlファイルへ生成
      new HtmlWebpackPlugin({
        filename: '../../index.html', // bundle.jsからの相対位置
        template: 'src/ejs/index.ejs',
        // inject: false, // scriptタグの自動生成を外す
        inject: 'body', // scriptタグの自動生成をbodyタグ上に入れる
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
          { from: 'src/assets/img', to: '../img' },
          // { from: './src/favicon.png', to: 'favicon.png' },
          // { from: './src/favicon.svg', to: 'favicon.svg' },
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
      // リロードのためのプラグイン
      new webpack.HotModuleReplacementPlugin(),
      // バンドルファイルのサイズを可視化。ブラウザを開く
      // new BundleAnalyzerPlugin()
    ],
    optimization: {
      minimizer: [
        // (env === 'development' ? '' : new OptimizeCSSAssetsPlugin()),// CSSのminifyを行う
        new OptimizeCSSAssetsPlugin(),// CSSのminifyを行う
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: {
             // errorとwarn以外のコンソールを削除する
              drop_console: true
            },
            format: {
              comments: false,
              beautify: false,
            },
          }
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true
          }
        }
      }
    },
  },
];
