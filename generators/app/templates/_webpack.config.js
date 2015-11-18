module.exports = {

  entry: './app/client.js',
  output: {
    filename: 'bundle.js',
    path: 'build/scripts/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          compact: false,
        },
        exclude: /node_modules/,
      }
    ]
  },
};
