import React, {
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormField,
  Container,
} from 'semantic-ui-react';
import { navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import useIntroData from '../hooks/useIntroData';
import { externalPath } from '../contants/paths';

const PurchasePage = ({ location }) => {
  const introId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('intro');
  }, [location]);

  const {
    intro,
    introData,
    price,
  } = useIntroData(introId, {
    onNotFound: () => {
      navigate('/');
    },
  });

  if (!introData) {
    return null;
  }

  return (
    <Layout>
      <SEO
        title="Purchase"
        meta={[{
          property: 'og:url',
          content: 'https://kassellabs.io/',
        }]}
      />
      <Container text>
        <Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Purchase Details:
        </Title>
        <Paragraph style={{ textAlign: 'center' }}>
          Thanks for supporting us! We&apos;ll be back when your video is finished.
        </Paragraph>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            // Ignore submission
          }}
        >
          <FormField>
            {/* eslint-disable-next-line */}
            <label htmlFor="intro-name">Type:</label>
            <input
              id="intro-name"
              type="text"
              value={intro.title}
              disabled
              style={{
                borderColor: 'black',
                color: 'black',
                opacity: 1,
                background: '#ddd',
              }}
            />
          </FormField>
          {intro.optionals.map((field) => {
            const isChecked = Boolean(introData.optionals.some((o) => o === field.id));
            if (!isChecked) {
              return null;
            }

            return (
              <div className="field" style={{ opacity: 1 }}>
                <div className="ui checked checkbox">
                  <input
                    id={field.id}
                    readOnly
                    type="checkbox"
                    checked
                    disabled
                    style={{ opacity: '1 !important' }}
                  />
                  <label htmlFor={field.id} style={{ opacity: 1 }}>
                    { field.label }
                  </label>
                </div>
              </div>
            );
          })}
          {intro.fields.map((field) => {
            if (field.type === 'text') {
              return (
                <FormField
                  key={field.id}
                >
                  <label htmlFor={field.id}>{ field.label }</label>
                  <input
                    id={field.id}
                    type="text"
                    required={field.required}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    value={introData[field.id] || ''}
                    disabled
                    style={{
                      borderColor: 'black',
                      color: 'black',
                      opacity: 1,
                      background: '#ddd',
                    }}
                  />
                </FormField>
              );
            }

            return null;
          })}
          <Paragraph>
            Total Price: $
            {' '}
            {price.toFixed(2)}
            <br />
            <small>
              Estimated Delivery:
              {' '}
              {intro.deliveryTime}
              {' '}
              (starting from
              {' '}
              {new Date(introData.created_at).toLocaleDateString()}
              )
            </small>
          </Paragraph>
          <Paragraph>
            Your video will be delivered through email.
          </Paragraph>
          <Title>Questions?</Title>
          <Paragraph>
            Check out the FAQ, we might already have an answer for you:
            {' '}
            <a href={externalPath('faq')}>{externalPath('faq')}</a>
          </Paragraph>
          <Paragraph>
            Feel free to contact us via the email:
            {' '}
            <a href="mailto:contact@kassellabs.io">contact@kassellabs.io</a>
          </Paragraph>
        </Form>
      </Container>
    </Layout>
  );
};

PurchasePage.propTypes = {
  location: PropTypes.object,
};

export default PurchasePage;
