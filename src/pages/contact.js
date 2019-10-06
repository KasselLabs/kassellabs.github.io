import React from 'react';
import { Container } from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import { externalPath } from '../contants/paths';

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <Container text>
      <Title>Contact</Title>
      <Paragraph>
        First, check out the FAQ, we might already have an answer for you:
        {' '}
        <a href={externalPath('faq')}>{externalPath('faq')}</a>
      </Paragraph>
      <Paragraph>
          Feel free to contact us via the email:
        {' '}
        <a href="mailto:contact@kassellabs.io">contact@kassellabs.io</a>
      </Paragraph>
      <br />
      <Title>Custom requests</Title>
      <Paragraph>
        Have a special request for us?
        We can work on other intro creators, customizations, or just
        something new that you have in mind.
      </Paragraph>
      <Paragraph>
        Send your request to
        {' '}
        <a href="mailto:contact@kassellabs.io">contact@kassellabs.io</a>
        {' '}
        and provide the following details:
      </Paragraph>
      <Paragraph>
        <ul>
          <li>Describe what video or other content you want</li>
          <li>Add images, links or videos on YouTube that are close to what you want</li>
          <li>Have a deadline? Please share</li>
          <li>Any details that you already need, please share them</li>
        </ul>
      </Paragraph>
    </Container>
  </Layout>
);

export default Contact;
