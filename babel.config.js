module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // modules: false,
          targets: [
            'last 2 versions',
            'ie >= 11',
            'Android >= 6',
            'iOS >= 11',
            'Firefox ESR'
          ],
          // debug: true,
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      ['@babel/preset-typescript'],
    ],
  };
};
