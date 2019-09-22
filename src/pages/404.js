import React from 'react';

import { Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to="/">Go back</Link>
  </Layout>
);

export default NotFoundPage;
