const { merge } = require('webpack-merge');

module.exports = (config) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
        },
      ],
    },
  });
};
