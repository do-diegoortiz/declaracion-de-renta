const path = require('path');
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')

module.exports = withOffline(
  withSass({
    // Code from https://github.com/hanford/next-offline/tree/master/packages/now2-example
    target: 'serverless',
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
    // turn on the SW in dev mode so that we can actually test it
    workboxOpts: {
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },

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
  })
);
