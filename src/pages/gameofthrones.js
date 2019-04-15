import React from 'react';
import { Link } from 'gatsby';
import { Input } from 'semantic-ui-react';
import YouTube from 'react-youtube';

import '../styles/coming-soon/coming-soon.css';

const GameOfThronesComingSoon = () => (
  <div className="coming-soon">
    <YouTube
      className="coming-soon__video"
      containerClassName="coming-soon__video-container"
      videoId="ANJwzgCBVuY"
      opts={{
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 1,
        },
      }}
      onReady={event => event.target.playVideo()}
      onEnd={event => event.target.playVideo()}
    />
    <div className="masthead">
      <div className="masthead-bg" />
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12 my-auto">
            <div className="masthead-content text-white py-5 py-md-0">
              <a className="logo-anchor" href="https://kassellabs.io/">
                <div className="logo">
                  <span>Kassel</span>
                  {' '}
                  <span>Labs</span>
                </div>
              </a>
              <h1 className="mb-3 title">GAME OF THRONES INTRO CREATOR</h1>
              <h2 className="mb-3">Coming Soon!</h2>
              <p className="mb-5">
                {"We're working hard to finish the development of this new website."}
                {' '}
                <strong>Sign up for updates</strong>
                {' '}
                using the form below! We promise not to send spam!
              </p>
              <form
                action="https://kassellabs.us18.list-manage.com/subscribe/post?u=955f23a083dc8aff26326536a&amp;id=eb001c8fcc"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                target="_blank"
              >
                <div className="input-group input-group-newsletter coming-soon__input-container">
                  <Input
                    id="mce-EMAIL"
                    name="EMAIL"
                    type="email"
                    autocomplete="email"
                    required
                    action={{ color: 'blue', content: 'Notify me!' }}
                    placeholder="Enter your email..."
                    aria-label="Enter your email..."
                    size="large"
                    className="coming-soon__input"
                  />
                </div>
              </form>
              <br />
              <p>
                <Link to="/" className="coming-soon__link">Check out more intro creators we have here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GameOfThronesComingSoon;
