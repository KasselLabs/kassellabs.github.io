import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

import './CardPhoto.styl';

const CardPhoto = ({
  name,
  roleTitle,
  linkedin,
  description,
  image,
  isRight,
}) => (
  <div className={classNames('card-photo', {
    'card-photo--right': isRight,
  })}
  >
    <div className={classNames('card-photo__image', {
      'card-photo__image--right': isRight,
    })}
    >
      {image()}
    </div>
    <div>
      <h3 className={classNames('card-photo__title', {
        'card-photo__title--right': isRight,
      })}
      >
        {name}
        <a
          className="card-photo__social-media"
          href={linkedin}
          target="__blank"
          rel="noopener noreferrer"
        >
          <Icon name="linkedin" size="large" />
        </a>
      </h3>
      <h4 className="card-photo__role">
        { roleTitle }
      </h4>
      <div />
      <p>{description}</p>
    </div>
  </div>
);

CardPhoto.propTypes = {
  name: PropTypes.string,
  roleTitle: PropTypes.string,
  linkedin: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.func.isRequired,
  isRight: PropTypes.bool,
};

export default CardPhoto;
