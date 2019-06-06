const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname, `src`), `node_modules`],
    extensions: [`.ts`, `.tsx`, `.js`, `json`],
    alias: {
      App: path.resolve(__dirname, 'src'),
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },
  devtool: `source-map`
};
