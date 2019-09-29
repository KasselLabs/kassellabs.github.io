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
  fullImage,
}) => (
  <div
    id={id}
    className={classNames('section', {
      'section--dark': isDark,
      'section--right': isRight,
    })}
  >
    <div className={classNames('section__image', {
      'section__image--full': fullImage,
    })}
    >
      {image()}
    </div>
    <div className="section__content">
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
  fullImage: PropTypes.bool,
};

Section.defaultProps = {
  image: () => {},
};

export default Section;
