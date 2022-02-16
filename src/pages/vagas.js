import React from 'react';
import { NotionRenderer } from 'react-notion-x';

import jobsPageJSON from '../contants/vagas.json';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Jobs = () => (
  <Layout>
    <SEO title="Ventures" meta={[{ property: 'og:url', content: 'https://kassellabs.io/ventures/' }]} />
    <NotionRenderer recordMap={jobsPageJSON} fullPage darkMode={false} />
  </Layout>
);

export default Jobs;
