import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.styl';

const Layout = ({ children, topRender }) => (
  <>
    <Navbar />
    {topRender}
    <main>
      {children}
    </main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  topRender: PropTypes.node,
};

export default Layout;
