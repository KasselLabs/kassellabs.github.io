import React from 'react';
import { Container } from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import { externalPath } from '../contants/paths';

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <br />
    <Container>
      <Title>Contact</Title>
      <p>
          Check out the FAQ, we might already have an answer for you:
        {' '}
        <a href={externalPath('faq')}>{externalPath('faq')}</a>
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
