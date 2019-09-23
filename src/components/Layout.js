import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.styl';

const Layout = ({ children, topRender }) => (
  <>
    <Navbar />
    {topRender}
    <main>
      <Container text>
        {children}
      </Container>
    </main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  topRender: PropTypes.node,
};

export default Layout;
