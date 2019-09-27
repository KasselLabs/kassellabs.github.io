import React from 'react';
import { Link } from 'gatsby';
import { Container, Icon } from 'semantic-ui-react';

import { internalPath, externalPath } from '../contants/paths';
import logo from '../../static/assets/logo.svg';
import './Footer.styl';

const Footer = () => (
  <footer className="footer">
    <Container>
      <div className="footer__content">
        <div className="footer__section">
          <Link to={internalPath('home')} className="footer__logo">
            <img src={logo} alt="Kassel Labs logo" height="40px" />
          </Link>
          <div>
            <a
              className="footer__link footer__contact-link"
              href="mailto:contact@kasselabs.io"
            >
              contact@kasselabs.io
            </a>
          </div>
          <div>
            <a
              className="footer__link"
              href={externalPath('instagram')}
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" size="large" />
            </a>
            <a
              className="footer__link"
              href={externalPath('facebook')}
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="facebook" size="large" />
            </a>
            <a
              className="footer__link"
              href={externalPath('twitter')}
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="twitter" size="large" />
            </a>
            <a
              className="footer__link"
              href={externalPath('linkedin')}
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="linkedin" size="large" />
            </a>
          </div>
        </div>
        <div className="footer__section">
          <span className="footer__section-title">Company</span>
          <Link to={internalPath('home')} className="footer__link">Home</Link>
          <Link to={internalPath('about')} className="footer__link">About</Link>
          <Link to={internalPath('blog')} className="footer__link">Blog</Link>
        </div>
        <div className="footer__section">
          <span className="footer__section-title">Intro Creators</span>
          <a className="footer__link" href={externalPath('starWarsIntroCreator')}>
            Star Wars Intro Creator
          </a>
          <a className="footer__link" href={externalPath('strangerThingsIntroCreator')}>
            Stranger Things Intro Creator
          </a>
          <a className="footer__link" href={externalPath('westworldIntroCreator')}>
            Westworld Intro Intro Creator
          </a>
          <a className="footer__link" href={externalPath('gameOfThronesIntroCreator')}>
            Game of Thrones Intro Creator
          </a>
        </div>
        <div className="footer__section">
          <span className="footer__section-title">Support</span>
          <a className="footer__link" href={externalPath('faq')}>
            FAQ
          </a>
          <a className="footer__link" href={externalPath('faq')}>
            Terms of Service
          </a>
          <a className="footer__link" href={externalPath('privacyPolicy')}>
            Privacy Policy
          </a>
          <Link to={internalPath('contact')} className="footer__link">Contact</Link>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
