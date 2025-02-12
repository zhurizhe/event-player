// webpack.config.js
const path = require('path');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    // library: 'EventPlayer',
    libraryTarget: 'module',
    clean: true,  // 每次构建时清理 dist 文件夹
    module: true,  // 开启模块化支持
    globalObject: 'this' // 在不同环境下正确工作（浏览器或 Node.js）
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],  // 自动解析这些扩展名
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],  // 定义模块解析路径
    alias: {
      'leaflet$': 'leaflet/dist/leaflet.js', // Leaflet路径别名
    },
  },
  optimization: {
    minimize: true,
  },
  plugins: [new BundleAnalyzerPlugin()],
  experiments:{
    outputModule: true,  // 开启输出模块
  }
}


