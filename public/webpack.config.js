const path = require('path');
module.exports = {
  entry: ["./module.js"],
    mode: 'development',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
     watch : true
};