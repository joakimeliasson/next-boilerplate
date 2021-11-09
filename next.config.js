const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/sv/nyheter",
          destination: "/sv/news",
          locale: false,
        },
      ],
    };
  },
};
