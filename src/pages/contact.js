import React from 'react';
import { Container } from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <br />
    <Container>
      <h1>Contact</h1>
      <p>
          Check out the FAQ, we might already have an answer for you:
        {' '}
        <a href="https://help.kassellabs.io">https://help.kassellabs.io</a>
      </p>
      <p>
          Feel free to contact us via the email
        {' '}
        <a href="mailto:support@kassellabs.io">support@kassellabs.io</a>
      </p>
    </Container>
  </Layout>
);

export default Contact;
