/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://busco.at',
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const pages = await fetch(
      `${process.env.NEXT_APOLLO_CLIENT_URL}/api/pdps`,
      {
        next: { revalidate: 10 },
      },
    );

    const urls = await pages.json();
    const entries = Array.isArray(urls?.data) ? urls.data : [];
    const slugs = entries
      .map((url) => (url.attributes ?? url)?.slug)
      .filter(Boolean);

    const paths = await Promise.all(
      slugs.map((slug) => {
        return config.transform(config, `/service/${slug}`);
      }),
    );

    return paths;
  },
};
