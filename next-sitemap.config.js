/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://busco.at',
  generateRobotsTxt: true,
  exclude: ['/sitemap.xml', '/robots.txt'],
  additionalPaths: async (config) => {
    const allPaths = [];

    // Add static pages
    const staticPages = [
      '/',
      '/anfrage',
      '/datenschutz',
      '/agb',
      '/impressum',
      '/partner-werden',
      '/service',
    ];

    staticPages.forEach((path) => {
      allPaths.push({
        loc: path,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    try {
      // Fetch dynamic service paths
      const pages = await fetch(
        `${process.env.NEXT_APOLLO_CLIENT_URL}/api/pdps`,
      );

      const urls = await pages.json();
      const entries = Array.isArray(urls?.data) ? urls.data : [];
      const slugs = entries
        .map((url) => (url.attributes ?? url)?.slug)
        .filter(Boolean);

      slugs.forEach((slug) => {
        allPaths.push({
          loc: `/service/${slug}`,
          changefreq: 'daily',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      });
    } catch (error) {
      console.warn(
        '[next-sitemap] Unable to fetch service paths from Strapi:',
        error.message,
      );
    }

    try {
      // Fetch article/content paths
      const nav = await fetch(
        `${process.env.NEXT_APOLLO_CLIENT_URL}/api/navigation/render/navigation?type=FLAT`,
      );

      const navData = await nav.json();
      const articles = Array.isArray(navData) ? navData : [];
      articles.forEach((item) => {
        if (item.path && item.path !== '/') {
          allPaths.push({
            loc: item.path,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date().toISOString(),
          });
        }
      });
    } catch (error) {
      console.warn(
        '[next-sitemap] Unable to fetch article paths from Strapi:',
        error.message,
      );
    }

    return allPaths;
  },
};
