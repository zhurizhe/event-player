// webpack.config.js
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig ={
  entry: './src/js/main.js',
 
  mode: 'development',
  devtool: 'inline-source-map', // 开发模式使用源映射，方便调试
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      'leaflet$': 'leaflet/dist/leaflet.js', // Leaflet路径别名
    },
  },
 
};
module.exports = [
  merge(baseConfig, {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.umd.js',
      library: 'EventPlayer',
      libraryTarget: 'umd',
    },
  }),
  merge(baseConfig, {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.esm.js',
      libraryTarget: 'module',
    },
    experiments: {
      outputModule: true,  // 启用 ESM 输出
    },
  }),
];