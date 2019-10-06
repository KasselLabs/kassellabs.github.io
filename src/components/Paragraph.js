import React from 'react';
import PropTypes from 'prop-types';

import './Paragraph.styl';

const Paragraph = ({ children }) => (
  <h1 className="paragraph">{children}</h1>
);

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Paragraph;
