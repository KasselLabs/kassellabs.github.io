import React, { useState, useCallback } from 'react';
import { Button, Input } from 'semantic-ui-react';
import ReactPixel from 'react-facebook-pixel';
import axios from 'axios';

import './NewsletterSubscribeForm.styl';

const NEWSLETTER_API_URL = 'https://api.kassellabs.io/api/newsletter-subscribers';

export default function NewsletterSubscribeForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    setLoading(true);
    setIsSubmitted(false);

    ReactPixel.track('Lead');

    try {
      await axios.request({
        url: NEWSLETTER_API_URL,
        method: 'POST',
        data: {
          email,
          language: navigator.language,
          source: 'kassel-labs-website',
        },
      });
      setEmail('');
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  }, [email, setLoading, setIsSubmitted]);

  return (
    <form
      className="newsletter-subscribe-form"
      onSubmit={handleSubmit}
    >
      <Input
        id="mce-EMAIL"
        name="EMAIL"
        type="email"
        autocomplete="email"
        required
        placeholder="Enter your email..."
        aria-label="Enter your email..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      {isSubmitted && (
        <>
          <p className="success-message">Thank You! You&apos;ll be notified when we release something new!</p>
        </>
      )}
      <Button type="submit" primary disabled={loading}>
        {loading ? 'Loading...' : 'Sign up to newsletter'}
      </Button>
    </form>
  );
}
