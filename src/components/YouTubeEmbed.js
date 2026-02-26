import React from 'react';
import PropTypes from 'prop-types';

export default function YouTubeEmbed({ code, videoSrc }) {
  if (videoSrc) {
    return (
      <video
        controls
        preload="metadata"
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '8px',
          backgroundColor: '#000',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }

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
        borderRadius: '8px',
      }}
    />
  );
}

YouTubeEmbed.propTypes = {
  code: PropTypes.string,
  videoSrc: PropTypes.string,
};
