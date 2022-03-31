import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';

const NEWSLETTER_API_URL = 'https://api.kassellabs.io/api/newsletter-subscribers';

function UnsubscribePage({ location }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    axios.request({
      method: 'POST',
      url: NEWSLETTER_API_URL,
      data: {
        email: params.get('email'),
        isSubscribed: false,
      },
    }).then(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <SEO title="Contact" meta={[{ property: 'og:url', content: 'https://kassellabs.io/contact/' }]} />
      <Container text>
        <Title>Unsubscribe</Title>
        <Paragraph>
          { loading ? 'Loading...' : "You're unsubscribed from our mailing list." }
        </Paragraph>
        <div style={{ height: '50vh' }} />
      </Container>
    </Layout>
  );
}

UnsubscribePage.propTypes = {
  location: PropTypes.object,
};

export default UnsubscribePage;
