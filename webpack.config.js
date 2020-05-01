const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './ckan.js',
  output: {
    filename: 'ckan.bundle.js',
    library: 'CKAN'
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    namedModules: true
  }
};
