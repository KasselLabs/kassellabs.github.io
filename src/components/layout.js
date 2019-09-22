import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import './Layout.styl';

const Layout = ({ children, topRender }) => (
  <>
    <Header />
    {topRender}
    <main>
      <Container text>
        {children}
      </Container>
    </main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  topRender: PropTypes.node,
};

export default Layout;
