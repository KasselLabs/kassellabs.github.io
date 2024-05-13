import React, {
  useRef, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Form,
  FormField,
  Container,
} from 'semantic-ui-react';
import { Link, navigate } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import PaymentForm from '../components/PaymentForm';
import useIntroData from '../hooks/useIntroData';
import { internalPath } from '../contants/paths';

const PurchasePage = ({ location }) => {
  const iframeRef = useRef();
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

  const paymentParams = useMemo(() => ({
    embed: true,
    app: 'custom-video',
    code: introData?.id,
    amount: Math.round(price * 100),
    fixedAmount: 'true',
  }), [introData, price]);

  useEffect(() => {
    if (!iframeRef.current) {
      return () => {};
    }

    const onPaymentFinished = (event) => {
      const { data } = event;

      if (data?.type !== 'payment') {
        return;
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'purchase',
          value: data.payload.finalAmount,
          currency: data.payload.currency,
        });
      }
      navigate(internalPath('purchaseDetails', {
        intro: introData.id,
      }));
    };
    window.addEventListener('message', onPaymentFinished);
    return () => {
      window.removeEventListener('message', onPaymentFinished);
    };
  }, [iframeRef.current, introData]);

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
          <PaymentForm
            iframeRef={iframeRef}
            params={paymentParams}
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
