// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  localePath: require("path").resolve("./public/locales"),
};
