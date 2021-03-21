module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: [
            'last 2 versions',
            'ie 9',
            'Android >= 4',
            'Firefox ESR'
          ],
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
  };
};
