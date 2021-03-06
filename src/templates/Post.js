import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import moment from 'moment';
import { Container } from 'semantic-ui-react';
import queryString from 'query-string';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import BlockContent from '../components/BlockContent';
import { internalPath } from '../contants/paths';
import './Post.styl';

export const query = graphql`
  query Post ($slug: String) {
    sanityPost(slug: {current: {eq: $slug}}) {
      title
      mainImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      publishedAt
      _rawBody
      slug {
        current
      }
    }
  }
`;

const Post = ({ data }) => {
  const {
    title,
    mainImage,
    publishedAt,
    _rawBody,
    slug,
  } = data.sanityPost;

  let metaTagImage = [];
  if (mainImage) {
    // get url params
    const queryParams = mainImage.asset.fluid.src.replace(/.*\?/, '?');
    const { w, h } = queryString.parse(queryParams);

    metaTagImage = [
      { property: 'og:image', content: mainImage.asset.fluid.src },
      { property: 'og:image:width', content: w },
      { property: 'og:image:height', content: h },
    ];
  }

  return (
    <Layout>
      <SEO
        title={title}
        meta={[
          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: `https://kassellabs.io/blog/${slug.current}/` },
          ...metaTagImage,
        ]}
      />
      <Container text>
        <article className="post">
          <h1 className="post__title">{title}</h1>
          {publishedAt && (
            <time dateTime={publishedAt} className="post__time">
              {moment(publishedAt).format('LL')}
            </time>
          )}
          {mainImage && (
            <div className="post__main-image">
              <Image fluid={mainImage.asset.fluid} alt={title} />
            </div>
          )}
          {_rawBody && (
            <BlockContent blocks={_rawBody} />
          )}
        </article>
        <hr />
        <Link to={internalPath('home')}>Back to Home</Link>
      </Container>
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Post;
