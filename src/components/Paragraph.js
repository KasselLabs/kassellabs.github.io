import React from 'react';
import PropTypes from 'prop-types';

import './Paragraph.styl';

const Paragraph = ({ children, style }) => (
  <h1 className="paragraph" style={style}>{children}</h1>
);

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default Paragraph;
