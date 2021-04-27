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
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body'],
      },
    ],
  ],
};
