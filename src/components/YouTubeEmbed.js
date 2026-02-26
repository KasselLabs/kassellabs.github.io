import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function VideoPlayer({ videoSrc }) {
  const videoRef = useRef(null);
  const seekRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const handleUnmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.play();
    setMuted(false);
    setShowOverlay(false);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const handleSeek = useCallback((e) => {
    const video = videoRef.current;
    const bar = seekRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '16 / 9',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#000',
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onClick={showOverlay ? undefined : togglePlay}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          cursor: showOverlay ? 'default' : 'pointer',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {showOverlay && (
        <div
          onClick={handleUnmute}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%, transparent 100%)',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#111">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span style={{
            marginTop: 12,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            letterSpacing: '0.02em',
          }}>
            Click to play with sound
          </span>
        </div>
      )}

      {!showOverlay && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          padding: '24px 12px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          {/* Seek bar */}
          <div
            ref={seekRef}
            onClick={handleSeek}
            style={{
              height: 4,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 2,
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <div style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#fff',
              borderRadius: 2,
              transition: 'width 0.1s linear',
            }} />
          </div>

          {/* Controls row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {/* Play/Pause */}
            <button onClick={togglePlay} style={controlBtnStyle} title={playing ? 'Pause' : 'Play'}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Mute/Unmute */}
            <button onClick={toggleMute} style={controlBtnStyle} title={muted ? 'Unmute' : 'Mute'}>
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            {/* Time */}
            <span style={{
              color: '#fff',
              fontSize: 12,
              fontFamily: 'monospace',
              marginLeft: 4,
            }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const controlBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  padding: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
};

export default function YouTubeEmbed({ code, videoSrc }) {
  if (videoSrc) {
    return <VideoPlayer videoSrc={videoSrc} />;
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
