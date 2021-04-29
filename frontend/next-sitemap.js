module.exports = {
  siteUrl: 'https://leposti.ml',
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/dashboard/*', '/dashboard/*', "/login", "/register", "/forgotpassword", "/restorepassword", "/cookies", "/metodo_cobro", "/politica_privacidad", "/terminos"],
  // Default transformation function
  transform: async (config, path) => ({
    loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
