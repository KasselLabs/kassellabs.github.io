import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import './CTA.styl';

const CTA = ({ text, url }) => {
  if (url) {
    return (
      <div className="cta">
        <Button as="a" href={url} primary size="huge">{text}</Button>
      </div>
    );
  }

  return (
    <div className="cta">
      <Button primary size="huge">{text}</Button>
    </div>
  );
};

CTA.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

export default CTA;
