/* eslint-disable no-alert */
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormField,
  Container,
  Button,
} from 'semantic-ui-react';
import { navigate } from 'gatsby';
import axios from 'axios';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import useIntroData from '../hooks/useIntroData';
import kasselApi from '../kasselApi';

import marvelStudiosGif from '../images/marvel-studios.gif';
import marvelStudiosFlipbookGif from '../images/marvel-studios-flipbook.gif';
import harryPotterDeathlyHallowsGif from '../images/harry-potter-deathly-hallows.gif';
import pixarGif from '../images/pixar.gif';
import avengersInifityWarGif from '../images/avengers-infinity-war.gif';
import spiderManFarFromHomeGif from '../images/spider-man-far-from-home.gif';
import lokiGif from '../images/loki.gif';
import disneyGif from '../images/disney.gif';
import guardiansOfTheGalaxyVol2Gif from '../images/guardians-of-the-galaxy-vol-2.gif';

const LOCAL_STORAGE_PASSWORD_KEY = 'uploadVideoPassword';

const getSignedUploadURL = async (id, password) => {
  const response = await kasselApi.request({
    url: `/api/intro/get-signed-upload-url/${id}`,
    method: 'GET',
    headers: {
      secret: password,
    },
  });
  return response.data.uploadPath;
};

const notifyUploadFinished = async (id, password) => kasselApi.request({
  url: `/api/intro/notify-upload-finished/${id}`,
  method: 'POST',
  headers: {
    secret: password,
  },
});

const uploadFile = async (uploadURL, file) => {
  const params = new URLSearchParams(uploadURL);

  await axios.put(uploadURL, file, {
    crossDomain: true,
    headers: {
      'Content-Type': params.get('Content-Type'),
      'X-AMZ-ACL': params.get('x-amz-acl'),
    },
  });
};

const INTRO_IMAGE_MAP = {
  'marvel-studios': marvelStudiosGif,
  'marvel-studios-flipbook': marvelStudiosFlipbookGif,
  'harry-potter': harryPotterDeathlyHallowsGif,
  pixar: pixarGif,
  'avengers-infinity-war': avengersInifityWarGif,
  'spider-man-far-from-home': spiderManFarFromHomeGif,
  'guardians-of-the-galaxy-vol-2': guardiansOfTheGalaxyVol2Gif,
  loki: lokiGif,
  disney: disneyGif,
};

const PurchasePage = ({ location }) => {
  const fileInputRef = useRef(null);
  const [password, setPassword] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const introId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('intro');
  }, [location]);

  const {
    intro,
    introData,
  } = useIntroData(introId, {
    onNotFound: () => {
      navigate('/');
    },
  });

  useEffect(() => {
    const localStoragePassword = localStorage.getItem(LOCAL_STORAGE_PASSWORD_KEY);
    if (localStoragePassword) {
      setPassword(localStoragePassword);
      return;
    }

    // eslint-disable-next-line no-alert
    const promptPassword = prompt('Type your upload video password:');
    setPassword(promptPassword);
    localStorage.setItem(LOCAL_STORAGE_PASSWORD_KEY, promptPassword);
  }, [password]);

  if (!introData) {
    return null;
  }

  return (
    <Layout>
      <SEO
        title="Upload Video"
        meta={[{
          property: 'og:url',
          content: 'https://kassellabs.io/',
        }]}
      />
      <Container text>
        <Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Upload Video:
        </Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={INTRO_IMAGE_MAP[intro.slug]}
            alt={intro.title}
            height="200px"
          />
        </div>
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Button
              id="upload-button"
              primary
              size="huge"
              loading={loading}
              type="button"
              disabled={success}
              onClick={async () => {
                fileInputRef.current.click();
              }}
            >
              Upload
            </Button>
            {success && (
              <Paragraph>
                Thanks! Your video has been received.
              </Paragraph>
            )}
          </div>
        </Form>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept=".mp4"
          onChange={async (event) => {
            const file = event.target.files[0];
            // eslint-disable-next-line no-param-reassign
            event.target.value = null;

            if (!file) {
              return;
            }

            try {
              setLoading(true);
              const url = await getSignedUploadURL(introId, password);
              await uploadFile(url, file);
              await notifyUploadFinished(introId, password);
              setSuccess(true);
            } catch (uploadError) {
              if (uploadError.response.status === 403) {
                alert('Unauthorized, please re-type your password');

                // Clear the user password, wait for the password to be re-typed
                // and auto-submit afterwards
                setTimeout(() => {
                  localStorage.removeItem(LOCAL_STORAGE_PASSWORD_KEY);
                  setPassword(null);

                  setTimeout(() => {
                    document.querySelector('#upload-button').click();
                  }, 500);
                }, 200);
                return;
              }
              alert('Upload failed. Check your connection and try again.');
            } finally {
              setLoading(false);
            }
          }}
        />
      </Container>
    </Layout>
  );
};

PurchasePage.propTypes = {
  location: PropTypes.object,
};

export default PurchasePage;
