const path = require('path');
const output = path.join(__dirname, 'public');

const babel =  {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: [
      ['env', { targets: { browsers: ['ie 11'] } }],
      'react',
    ]
  }
};

module.exports = {
  entry: { bundle: ['./src/client/router.jsx']  },
  output: { 
    filename: '[name].js',
    path:  output
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".webpack.js", ".js", ".jsx", ".json"]
  },
  module: { loaders: [babel] }
}