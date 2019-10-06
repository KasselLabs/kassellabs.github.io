import React from 'react';
import PropTypes from 'prop-types';
import BaseBlockContent from '@sanity/block-content-to-react';

import './BlockContent.styl';

const serializers = {
  types: {
    // eslint-disable-next-line react/prop-types
    block({ node: { style }, children }) {
      switch (style) {
        case 'h1':
          return <h1 className="block-content-h1">{children}</h1>;

        case 'h2':
          return <h2 className="block-content-h2">{children}</h2>;

        case 'h3':
          return <h3>{children}</h3>;

        case 'h4':
          return <h4>{children}</h4>;

        case 'blockquote':
          return <blockquote className="block-content-blockquote">{children}</blockquote>;

        default:
          return <p className="block-content-p">{children}</p>;
      }
    },
  },
};

const BlockContent = ({ blocks }) => (
  <BaseBlockContent blocks={blocks} serializers={serializers} />
);

BlockContent.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default BlockContent;
