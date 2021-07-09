'use strict';

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  name: require('./package').name,
  options: {
    autoImport: {
      webpack: {
        node: {
          global: true,
        },
        plugins: [new NodePolyfillPlugin()],
      },
    },
  },
};
