import React from 'react';
import { Container } from 'semantic-ui-react';

import { Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <br />
    <Container>
      <h1>404: NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/">Go back</Link>
    </Container>
  </Layout>
);

export default NotFoundPage;
