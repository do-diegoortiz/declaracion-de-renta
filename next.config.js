const path = require('path');
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));

    config.module.rules.push({
      enforce: 'pre',
      test: /.scss$/,
      loader: 'sass-resources-loader',
      options: {
        resources: ['./styles/global.scss'],
      },
    });

    return config;
  },
  cssModules: true,
});
