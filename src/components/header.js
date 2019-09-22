import React from 'react';
import { Link } from 'gatsby';
import { Container } from 'semantic-ui-react';

import logo from '../../static/assets/logo.svg';

import './Header.styl';

const Header = () => (
  <header className="navbar">
    <Container>
      <nav className="navbar__content">
        <div>
          <Link to="/">
            <img src={logo} alt="Kassel Labs logo" height="40px" />
          </Link>
        </div>
        <ul className="navbar__right">
          <li>
            <Link to="/" className="navbar__right-item">Home</Link>
          </li>
          <li>
            <Link to="/" className="navbar__right-item">Intro Creators</Link>
          </li>
          <li>
            <Link to="/" className="navbar__right-item">Blog</Link>
          </li>
          <li>
            <Link to="/" className="navbar__right-item">About</Link>
          </li>
          <li>
            <Link to="/" className="navbar__right-item">Contact</Link>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
);

export default Header;
