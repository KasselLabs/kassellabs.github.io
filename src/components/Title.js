import React from 'react';
import PropTypes from 'prop-types';

import './Title.styl';

const Title = ({ children, style }) => (
  <h1 className="title" style={style}>{children}</h1>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default Title;
