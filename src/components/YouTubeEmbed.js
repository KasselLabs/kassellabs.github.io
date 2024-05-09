import React from 'react';
import PropTypes from 'prop-types';

export default function YouTubeEmbed({ code }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${code}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowfullscreen
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
      }}
    />
  );
}

YouTubeEmbed.propTypes = {
  code: PropTypes.string,
};
