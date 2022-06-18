const path = require('path')
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';

const imageInlineSizeLimit = 10 * 1024

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    !isEnvDevelopment && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            'postcss-normalize',
          ]
        },
        sourceMap: isEnvDevelopment,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isEnvDevelopment,
          root: path.resolve(__dirname, 'src'),
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};

module.exports = {
  mode: isEnvDevelopment ? 'development' : 'production',
  devtool: isEnvDevelopment ? 'cheap-module-source-map' : 'source-map',
  entry: './src/index.tsx',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'build'),
    filename: isEnvDevelopment ? 'js/bundle.js' : 'js/[name].[contenthash:8].js',
    chunkFilename: isEnvDevelopment ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'media/[name].[hash][ext]',
  },
  optimization: {
    minimize: !isEnvDevelopment,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new ModuleFederationPlugin({
      name: "RemoteHome",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        'Home': './src/router'
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
        }
      },
    }),
    isEnvDevelopment &&
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    isEnvDevelopment && new CaseSensitivePathsPlugin(),
    !isEnvDevelopment &&
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.avif$/],
            type: 'asset',
            mimetype: 'image/avif',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: require.resolve('@svgr/webpack'),
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                },
              },
              {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'media/[name].[hash].[ext]',
                },
              },
            ],
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: path.resolve(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              presets: [
                [
                  require.resolve('babel-preset-react-app'),
                  {
                    runtime: 'classic',
                  },
                ],
              ],

              plugins: [
                isEnvDevelopment &&
                require.resolve('react-refresh/babel'),
              ].filter(Boolean),
              cacheDirectory: true,
              cacheCompression: false,
              compact: !isEnvDevelopment,
            },
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,

              sourceMaps: false,
              inputSourceMap: false,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvDevelopment,
              modules: {
                mode: 'icss',
              },
            }),
            sideEffects: true,
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvDevelopment,
              modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
              },
            }),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvDevelopment,
                modules: {
                  mode: 'icss',
                },
              },
              'sass-loader'
            ),
            sideEffects: true,
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvDevelopment,
                modules: {
                  mode: 'local',
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              'sass-loader'
            ),
          },
          {
            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      "@": path.resolve(__dirname, 'src')
    },

  },
  devServer: {
    port: 3002,
    hot: true,
    client: {
      overlay: false
    }
  },
  performance: false,
}