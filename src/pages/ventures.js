import React from 'react';
import { NotionRenderer } from 'react-notion-x';

import venturesPageJSON from '../contants/ventures.json';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Ventures = () => (
  <Layout>
    <SEO title="Ventures" meta={[{ property: 'og:url', content: 'https://kassellabs.io/ventures/' }]} />
    <NotionRenderer recordMap={venturesPageJSON} fullPage darkMode={false} />
  </Layout>
);

export default Ventures;
