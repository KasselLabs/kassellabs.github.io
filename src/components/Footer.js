import React from 'react';
import { Link } from 'gatsby';
import { Container, Icon } from 'semantic-ui-react';

import logo from '../../static/assets/logo.svg';
import './Footer.styl';

const Footer = () => (
  <footer className="footer">
    <Container>
      <div className="footer__content">
        <div className="footer__section">
          <Link to="/" className="footer__logo">
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
              href="https://www.instagram.com/kassellabs/"
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" size="large" />
            </a>
            <a
              className="footer__link"
              href="https://www.facebook.com/KasselLabs/"
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="facebook" size="large" />
            </a>
            <a
              className="footer__link"
              href="https://twitter.com/KasselLabs"
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="twitter" size="large" />
            </a>
            <a
              className="footer__link"
              href="https://linkedin.com/company/kassellabs"
              target="__blank"
              rel="noopener noreferrer"
            >
              <Icon name="linkedin" size="large" />
            </a>
          </div>
        </div>
        <div className="footer__section">
          <span className="footer__section-title">Company</span>
          <Link to="/" className="footer__link">Home</Link>
          <Link to="/" className="footer__link">About</Link>
          <Link to="/" className="footer__link">Blog</Link>
        </div>
        <div className="footer__section">
          <span className="footer__section-title">Intro Creators</span>
          <a className="footer__link" href="http://starwarsintrocreator.kassellabs.io/">
            Star Wars Intro Creator
          </a>
          <a className="footer__link" href="https://gameofthronesintrocreator.kassellabs.io/">
            Game of Thrones Intro Creator
          </a>
          <a className="footer__link" href="https://strangerthingsintrocreator.kassellabs.io/">
            Stranger Things Intro Creator
          </a>
          <a className="footer__link" href="https://westworldintrocreator.kassellabs.io/">
            Westworld Intro Intro Creator
          </a>
        </div>
        <div className="footer__section">
          <span className="footer__section-title">Support</span>
          <a className="footer__link" href="https://help.kassellabs.io">
            FAQ
          </a>
          <a className="footer__link" href="https://help.kassellabs.io">
            Terms of Service
          </a>
          <a className="footer__link" href="https://help.kassellabs.io/privacy/">
            Privacy Policy
          </a>
          <Link to="/contact" className="footer__link">Contact</Link>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
