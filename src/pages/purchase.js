import React, {
  useRef, useMemo, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Form,
  FormField,
  Container,
} from 'semantic-ui-react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import kasselApi from '../kasselApi';
import { OTHER_INTROS } from '../contants/intros';
import { internalPath } from '../contants/paths';

const PurchasePage = ({ location }) => {
  const iframeRef = useRef();
  const [introData, setIntroData] = useState(null);
  const introId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('intro');
  }, [location]);

  useEffect(() => {
    if (!introId) {
      console.log('TODO: REDIRECT TO HOME');
      return;
    }

    kasselApi.request({
      url: `/api/intro/${introId}`,
    }).then((response) => {
      setIntroData(response.data);
    });
  }, [introId]);

  const intro = useMemo(() => (
    OTHER_INTROS.find((currentIntro) => currentIntro.slug === introData?.type)
  ), [introData]);

  const checkedOptionals = useMemo(() => {
    const checkedOptionalsSet = new Set(introData?.optionals);
    return intro?.optionals.filter((o) => checkedOptionalsSet.has(o.id));
  }, [intro, introData]);

  const price = useMemo(() => {
    const basePrice = intro?.price(introData);
    return basePrice + checkedOptionals?.reduce((accumulated, current) => (
      accumulated + current.price
    ), 0);
  }, [intro, introData, checkedOptionals]);

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
          <Link
            to={internalPath(intro.slug, { intro: introData.id })}
          >
            <Icon name="arrow left" size="small" />
          </Link>
          Purchase:
          {' '}
          {intro.title}
          {' '}
          Intro
        </Title>
        <Paragraph style={{ textAlign: 'center' }}>
          Please check the intro information before submitting the payment.
          <br />
          <Link
            to={internalPath(intro.slug, { intro: introData.id })}
          >
            Go back
          </Link>
          {' '}
          and edit your intro if you need to adjust anything.
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
            </small>
          </Paragraph>
          <iframe
            ref={iframeRef}
            className="payment-iframe"
            title="Payment Form"
            src={`${process.env.GATSBY_PAYMENT_PAGE_URL}?embed=true&app=custom&code=${introData.id}&amount=${Math.round(price * 100)}&fixedAmount=true`}
            style={{
              border: 'none',
              width: '100%',
              height: '520px',
            }}
          />

        </Form>
      </Container>
    </Layout>
  );
};

PurchasePage.propTypes = {
  location: PropTypes.object,
};

export default PurchasePage;
