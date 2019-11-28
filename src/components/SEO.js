import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import ReactPixel from 'react-facebook-pixel';

import ogImage from '../images/kassellabs-1280x720.png';

const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        url
      }
    }
  }
`;

const SEO = ({
  description,
  lang,
  meta,
  keywords,
  title,
}) => {
  useEffect(() => {
    ReactPixel.init(process.env.FACEBOOK_PIXEL);
  }, []);

  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => (
        <Helmet
          htmlAttributes={{ lang }}
          title={title || data.site.siteMetadata.title}
          titleTemplate={title && `%s | ${data.site.siteMetadata.title}`}
          meta={[
            { name: 'description', content: description || data.site.siteMetadata.description },
            { name: 'keywords', content: keywords || data.site.siteMetadata.keywords },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:creator', content: data.site.siteMetadata.author },
            { name: 'twitter:title', content: title || data.site.siteMetadata.title },
            { name: 'twitter:description', content: description || data.site.siteMetadata.description },
            { property: 'og:title', content: title || data.site.siteMetadata.title },
            { property: 'og:description', content: description || data.site.siteMetadata.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://kassellabs.io' },
            { property: 'og:image:alt', content: description || data.site.siteMetadata.description },
            { property: 'og:image:type', content: 'image/jpg' },
            { property: 'og:image:width', content: '1280' },
            { property: 'og:image:height', content: '720' },
            {
              property: 'og:image',
              content: `${process.env.NODE_ENV === 'production' ? data.site.siteMetadata.url : ''}${ogImage}`,
            },
          ].concat(meta)}
        />
      )}
    />
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  lang: PropTypes.string,
  keywords: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
};

SEO.defaultProps = {
  lang: 'en',
  meta: [],
};

export default SEO;
