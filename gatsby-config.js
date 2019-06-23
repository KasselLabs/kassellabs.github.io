require('dotenv').config();

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'Kassel Labs',
    description: 'Helping you to express your creativity and imagination with tools to create videos. Create your own opening of movies and series with our Intro Creators.',
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
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'w8pgxsnb',
        dataset: 'production',
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
