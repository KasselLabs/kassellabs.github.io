import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormField,
  Container,
  Input,
  Button,
  FormCheckbox,
} from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { OTHER_INTROS } from '../contants/intros';
import './PurchaseIntro.styl';

const PurchaseIntro = ({ pathContext: { slug } }) => {
  const intro = useMemo(() => OTHER_INTROS.find((currentIntro) => currentIntro.slug === slug), []);
  const [formValues, setFormValues] = useState({
    optionals: [],
  });

  const checkedOptionals = useMemo(() => {
    const checkedOptionalsSet = new Set(formValues.optionals);
    return intro.optionals.filter((o) => checkedOptionalsSet.has(o.id));
  }, [intro, formValues]);

  const price = useMemo(() => {
    const basePrice = intro.price(formValues);
    return basePrice + checkedOptionals.reduce((accumulated, current) => (
      accumulated + current.price
    ), 0);
  }, [intro, formValues]);

  const [loading, setLoading] = useState(false);

  const optionalsText = useMemo(() => {
    if (intro.optionals.length === 0) {
      return '';
    }

    const eachOptionalText = intro.optionals.map((optional) => `
${optional.label}: ${optional.description}
    `).join('\n\n');

    return `You can also improve your intro with some additional options, including:

${eachOptionalText}
`;
  }, [intro.optionals]);

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
              onSubmit={() => {
                setLoading(true);
                console.log(formValues);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              <Title>
                {intro.title}
                {' '}
                Intro
              </Title>
              <Title>
                $
                {' '}
                {price.toFixed(2)}
              </Title>
              {intro.optionals.map((field) => (
                <FormCheckbox
                  id={field.id}
                  label={`${field.label} (+ $ ${field.price.toFixed(2)})`}
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
                      optionals: currentValues.optionals.filter((o) => o === field.id),
                    }));
                  }}
                />
              ))}
              {intro.fields.map((field) => {
                if (field.type === 'text') {
                  return (
                    <FormField
                      key={field.id}
                    >
                      <label htmlFor={field.id}>{ field.label }</label>
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
            <YouTubeEmbed code={intro.youtubePreviewCode} />
          </div>
        </div>
        <h2>
          Description:
        </h2>
        <Paragraph>
          The intro is available in the
          {' '}
          {intro.resolution}
          {' '}
          resolution.
          <br />
          <br />
          {optionalsText}
        </Paragraph>
      </Container>
    </Layout>
  );
};

PurchaseIntro.propTypes = {
  pathContext: PropTypes.object,
};

export default PurchaseIntro;
