const OTHER_INTROS = require('./src/contants/intros.json');

// eslint-disable-next-line import/prefer-default-export
exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    {
      allSanityPost {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allSanityPost.edges.map(({ node }) => node);

  posts.forEach((post) => {
    actions.createPage({
      path: `/blog/${post.slug.current}`,
      component: require.resolve('./src/templates/Post.js'),
      context: {
        slug: post.slug.current,
      },
    });
  });
  OTHER_INTROS.forEach((intro) => {
    actions.createPage({
      path: `/intro/${intro.slug}`,
      component: require.resolve('./src/templates/PurchaseIntro.js'),
      context: {
        slug: intro.slug,
      },
    });
  });
};
