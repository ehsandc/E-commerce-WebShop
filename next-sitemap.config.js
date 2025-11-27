/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ecommerce-demo.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/auth/*', '/checkout'],
  robotsTxtOptions: {
    additionalSitemaps: [],
  },
};
