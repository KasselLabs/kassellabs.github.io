import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import moment from 'moment';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BlockContent from '../components/block-content';
import './post.styl';

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
    }
  }
`;

const Post = ({ data }) => {
  const {
    title,
    mainImage,
    publishedAt,
    _rawBody,
  } = data.sanityPost;

  return (
    <Layout>
      <SEO
        title={title}
        meta={[{ property: 'og:type', content: 'article' }]}
      />
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
      <br />
      <hr />
      <Link to="/">Back to Home</Link>
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Post;
