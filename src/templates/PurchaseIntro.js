import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';

const PurchaseIntro = ({ slug }) => (
  <Layout>
    <SEO title="Purchase Intro" meta={[{ property: 'og:url', content: `https://kassellabs.io/intro/${slug}` }]} />
    <Container text>
      <Title>Purchase Intro</Title>
      <Paragraph>
        Hello World
      </Paragraph>
    </Container>
  </Layout>
);

PurchaseIntro.propTypes = {
  slug: PropTypes.string,
};

export default PurchaseIntro;
