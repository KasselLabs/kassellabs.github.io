import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames';

import './Section.styl';

const Section = ({
  id,
  title,
  description,
  children,
  isDark,
  isRight,
  isCenter,
  image,
}) => (
  <div
    id={id}
    className={classNames('section', {
      'section--dark': isDark,
      'section--right': isRight,
    })}
  >
    <div className="section-image">
      {image()}
    </div>
    <Container>
      <div className={classNames('section__text', {
        'section__text--right': isRight,
        'section__text--center': isCenter,
      })}
      >
        <h1 className="section__title">{title}</h1>
        <p className="section__description">{description}</p>
      </div>
      <div>{children}</div>
    </Container>
  </div>
);

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  isDark: PropTypes.bool,
  isRight: PropTypes.bool,
  isCenter: PropTypes.bool,
  image: PropTypes.func,
};

Section.defaultProps = {
  image: () => {},
};

export default Section;
