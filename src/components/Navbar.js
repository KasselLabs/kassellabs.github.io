import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Container, Icon } from 'semantic-ui-react';
import classNames from 'classnames';

import { internalPath, externalPath } from '../contants/paths';
import logo from '../../static/assets/logo.svg';
import './Navbar.styl';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <Container>
        <nav className="navbar__content">
          <div>
            <Link to={internalPath('home')}>
              <img src={logo} alt="Kassel Labs logo" height="40px" />
            </Link>
          </div>
          <div className="navbar__menu">
            <button
              className="navbar__menu-burger"
              type="button"
              onClick={() => setIsMenuOpen(true)}
            >
              <Icon name="bars" size="large" />
            </button>
          </div>
          <ul className={classNames('navbar__right', {
            'navbar__right--close': !isMenuOpen,
            'navbar__right--open': isMenuOpen,
          })}
          >
            <li className="navbar__right-li">
              <Link
                to={internalPath('home')}
                className="navbar__right-item"
              >
                Home
              </Link>
            </li>
            <li className="navbar__right-li">
              <Link
                to={internalPath('introCreators')}
                className="navbar__right-item"
              >
                Intro Creators
              </Link>
            </li>
            <li className="navbar__right-li">
              <Link
                to={internalPath('blog')}
                className="navbar__right-item"
              >
                Blog
              </Link>
            </li>
            <li className="navbar__right-li">
              <Link
                to={internalPath('about')}
                className="navbar__right-item"
              >
                About
              </Link>
            </li>
            <li className="navbar__right-li">
              <a
                className="navbar__right-item"
                href={externalPath('faq')}
              >
                Support
              </a>
            </li>
            <li className="navbar__right-li">
              <Link
                to={internalPath('contact')}
                className="navbar__right-item"
              >
                Contact
              </Link>
            </li>
            <button
              className="navbar__menu-close"
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              x
            </button>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
