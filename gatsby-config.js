module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'Kassel Labs',
    description: 'Create your own intro of movies and series',
    author: '@kassellabs',
    keywords: 'kassel labs, intro creator',
    url: 'https://kassellabs.io',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-stylus',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kassel Labs',
        short_name: 'Kassel Labs',
        start_url: '/',
        background_color: '#141414',
        theme_color: '#141414',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-mdx',
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: 'UA-116931857-3',
        head: false,
        anonymize: true,
      },
    },
  ],
};
