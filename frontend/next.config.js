const webpack = require('webpack');
const { parsed: myEnv } = require('dotenv').config({});

module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === '1'
        ? {
            source: '/((?!maintenance).*)',
            destination: '/maintenance.html',
            permanent: false,
          }
        : null,
    ].filter(Boolean);
  },
};
