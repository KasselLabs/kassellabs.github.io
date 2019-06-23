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
      component: require.resolve('./src/templates/post.js'),
      context: {
        slug: post.slug.current,
      },
    });
  });
};
