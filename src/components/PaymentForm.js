import React, { useMemo } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import './PaymentForm.styl';

export default function PaymentForm({ params = {}, iframeRef }) {
  const paramsString = useMemo(() => (
    queryString.stringify(params)
  ), [params]);

  return (
    <iframe
      ref={iframeRef}
      className="payment-form"
      title="Payment Form"
      src={`${process.env.GATSBY_PAYMENT_PAGE_URL}?${paramsString}`}
    />
  );
}

PaymentForm.propTypes = {
  params: PropTypes.object,
  iframeRef: PropTypes.object,
};
