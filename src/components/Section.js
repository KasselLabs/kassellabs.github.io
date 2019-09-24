import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, description, children }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <div>{children}</div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Section;
