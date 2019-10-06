import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Button } from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Section from '../components/Section';
import { internalPath } from '../contants/paths';

import '../styles/404.styl';

export const query = graphql`
  query {
    background: file(relativePath: { eq: "background/stranger-things-bike.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const NotFoundPage = ({ data }) => (
  <Layout>
    <SEO title="404: Not found" />
    <Section
      title="404: Not found"
      description="We can't find the page you're looking for"
      isDark
      image={() => <Image fluid={data.background.childImageSharp.fluid} />}
      fullImage
    >
      <div className="not-found-page__text-container">
        <p />
        <p>What could have caused this?</p>
        <ul>
          <li>Well, something technical went wrong on our site.</li>
          <li>We might have removed the page when we redesigned our website.</li>
          <li>Or the link you clicked might be old and does not work anymore.</li>
          <li>Or you might have accidentally typed the wrong URL in the address bar.</li>
        </ul>
        <p>What you can do?</p>
        <ul>
          <li>You might try retyping the URL and trying again.</li>
          <li>Or you can back to the home page.</li>
        </ul>
        <p>
          If you want to help us fix this issue, we are here to help.
          Please
          {' '}
          <a href={internalPath('contact')}>contact us</a>
          {' '}
          and let us know what went wrong. Be sure to let us
          know what Web Browser and Operating System you were using when this
          occurred.
        </p>
        <Link to={internalPath('home')}>
          <Button primary>
            Go back
          </Button>
        </Link>
      </div>
    </Section>
  </Layout>
);

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NotFoundPage;
