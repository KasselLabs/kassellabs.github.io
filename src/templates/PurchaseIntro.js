import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormField,
  Container,
  Input,
  Button,
  FormCheckbox,
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import { navigate } from 'gatsby';

import lodash from 'lodash';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import kasselApi from '../kasselApi';
import YouTubeEmbed from '../components/YouTubeEmbed';
import OTHER_INTROS from '../contants/intros.json';
import { internalPath } from '../contants/paths';

import './PurchaseIntro.styl';

const areIntrosEqual = (intro1, intro2, settings) => {
  const fieldIds = [
    'optionals',
    ...settings.fields.map((f) => f.id),
  ];
  const sanitizedIntro1 = lodash.pick(intro1, fieldIds);
  const sanitizedIntro2 = lodash.pick(intro2, fieldIds);

  return lodash.isEqual(sanitizedIntro1, sanitizedIntro2);
};

const PurchaseIntro = ({ pathContext: { slug }, location }) => {
  const intro = useMemo(() => OTHER_INTROS.find((currentIntro) => currentIntro.slug === slug), []);

  const [originalIntro, setOriginalIntro] = useState(null);
  const [formValues, setFormValues] = useState({
    optionals: [],
  });

  const introId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('intro');
  }, [location]);

  useEffect(() => {
    if (!introId) {
      return;
    }

    kasselApi.request({
      url: `/api/intro/${introId}`,
    }).then((response) => {
      setFormValues(response.data);
      setOriginalIntro(response.data);
    });
  }, [introId]);

  const checkedOptionals = useMemo(() => {
    const checkedOptionalsSet = new Set(formValues.optionals);
    return intro.optionals.filter((o) => checkedOptionalsSet.has(o.id));
  }, [intro, formValues]);

  const price = useMemo(() => {
    const basePrice = intro.price;
    return basePrice + checkedOptionals.reduce((accumulated, current) => (
      accumulated + current.price
    ), 0);
  }, [intro, formValues, checkedOptionals]);

  const [loading, setLoading] = useState(false);

  const optionalsText = useMemo(() => {
    if (intro.optionals.length === 0) {
      return '';
    }

    const eachOptionalText = intro.optionals.map((optional) => `
- **${optional.label}**: ${optional.description || ''}
    `.trim()).join('\n\n\n');

    return `You can also improve your intro with some additional options, including:

${eachOptionalText}
`;
  }, [intro.optionals]);

  const description = useMemo(() => {
    const baseText = `
The intro is available in **${intro.resolution}** resolution.

The estimated delivery time for it is **${intro.deliveryTime}**.
`.trim();
    return `${baseText}\n\n${optionalsText}`;
  }, [intro, optionalsText]);

  return (
    <Layout>
      <SEO
        title={`Create ${intro.title} Intro`}
        meta={[{ property: 'og:url', content: `https://kassellabs.io/intro/${slug}` }]}
      />
      <Container>
        <div className="purchase-intro-main-section">
          <div className="forms">
            <Form
              onSubmit={async () => {
                if (areIntrosEqual(formValues, originalIntro, intro)) {
                  navigate(internalPath('purchase', { intro: originalIntro.id }));
                  return;
                }

                setLoading(true);
                try {
                  const response = await kasselApi.request({
                    method: 'POST',
                    url: 'api/intro',
                    data: {
                      type: slug,
                      intro: formValues,
                    },
                  });
                  navigate(internalPath('purchase', { intro: response.data.id }));
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Title>
                {intro.title}
                {' '}
                Intro
              </Title>
              <div className="preview-mobile">
                <YouTubeEmbed code={intro.youtubePreviewCode} videoSrc={`/videos/${slug}.mp4`} />
              </div>
              <Title>
                $
                {' '}
                {price.toFixed(2)}
              </Title>
              {intro.optionals.map((field) => (
                <FormCheckbox
                  id={field.id}
                  label={`${field.label} (+ $ ${field.price.toFixed(2)})`}
                  checked={formValues.optionals.some((o) => o === field.id)}
                  onChange={(event) => {
                    const isChecked = event.target.checked;
                    if (isChecked) {
                      setFormValues((currentValues) => ({
                        ...currentValues,
                        optionals: [...currentValues.optionals, field.id],
                      }));
                      return;
                    }

                    setFormValues((currentValues) => ({
                      ...currentValues,
                      optionals: currentValues.optionals.filter((o) => o !== field.id),
                    }));
                  }}
                />
              ))}
              {intro.fields.map((field) => {
                if (field.type === 'text') {
                  const label = (
                    field.maxLength
                      ? `${field.label} (Up to ${field.maxLength} characters)`
                      : field.label
                  );
                  return (
                    <FormField
                      key={field.id}
                    >
                      <label htmlFor={field.id}>{ label }</label>
                      <Input
                        id={field.id}
                        type="text"
                        required={field.required}
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        value={formValues[field.id] || ''}
                        onChange={(event) => {
                          const newValue = event.currentTarget && event.currentTarget.value;
                          setFormValues((currentValues) => {
                            const newValues = { ...currentValues };
                            newValues[field.id] = newValue;
                            return newValues;
                          });
                        }}
                      />
                    </FormField>
                  );
                }

                return null;
              })}
              <Button
                type="submit"
                primary
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Buy Now'}
              </Button>
            </Form>
          </div>
          <div className="preview">
            <YouTubeEmbed code={intro.youtubePreviewCode} videoSrc={`/videos/${slug}.mp4`} />
          </div>
        </div>
        <h2>
          Description:
        </h2>
        <div className="markdown-description">
          <ReactMarkdown>
            { description }
          </ReactMarkdown>
        </div>
      </Container>
    </Layout>
  );
};

PurchaseIntro.propTypes = {
  location: PropTypes.object,
  pathContext: PropTypes.object,
};

export default PurchaseIntro;
