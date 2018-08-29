const path = require('path')
const formatter = require('eslint-friendly-formatter')
const VueLoadrPlugin = require('vue-loader/lib/plugin')

const resolve = function(dir) {
  return path.join(__dirname, '..', dir)
}

const exclude = /(node_modules|bowser_components)/

// noinspection JSUnusedGlobalSymbols
module.exports = {
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('lib'),
      '@@': resolve('./'),
      '~~': resolve('./'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|ts|vue)/,
        loader: 'eslint-loader',
        options: {
          formatter,
        },
        exclude,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: (file) => (
          exclude.test(file) &&
          !/\.vue\.js/.test(file)
        ),
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude,
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
        exclude,
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {importLoaders: 1},
          },
          'stylus-loader',
        ],
        exclude,
      },
    ],
  },
  plugins: [
    new VueLoadrPlugin(),
  ],
}
