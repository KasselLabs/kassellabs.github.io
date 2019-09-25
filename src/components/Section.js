import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames';

import './Section.styl';

const Section = ({
  title,
  description,
  children,
  isDark,
  isRight,
  isCenter,
}) => (
  <div className={classNames('section', {
    'section--dark': isDark,
    'section--right': isRight,
  })}
  >
    <Container>
      <div className={classNames('section__text', {
        'section__text--right': isRight,
        'section__text--center': isCenter,
      })}
      >
        <h1 className="section__title">{title}</h1>
        <p className="section__description">{description}</p>
      </div>
      <div className="section__children">{children}</div>
    </Container>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
  isDark: PropTypes.bool,
  isRight: PropTypes.bool,
  isCenter: PropTypes.bool,
};

export default Section;
