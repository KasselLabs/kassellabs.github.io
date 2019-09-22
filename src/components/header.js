import React from 'react';
import { Link } from 'gatsby';
import { Container } from 'semantic-ui-react';

import logo from '../../static/assets/logo.svg';

import './Header.styl';

const Header = () => (
  <header className="navbar">
    <Container>
      <Link to="/">
        <div className="navbar__logo">
          <img src={logo} alt="Kassel Labs logo" height="40px" />
        </div>
      </Link>
    </Container>
  </header>
);

export default Header;
