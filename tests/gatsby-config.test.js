const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const config = require(path.join(__dirname, '..', 'gatsby-config.js'));

// Plugins are declared either as a plain string or as { resolve, options }
const pluginName = (plugin) => (typeof plugin === 'string' ? plugin : plugin.resolve);

test('gatsby-config exposes the site metadata required by SEO and pages', () => {
  const { siteMetadata } = config;
  assert.ok(siteMetadata, 'siteMetadata must be defined');
  assert.equal(siteMetadata.title, 'Kassel Labs');
  assert.equal(typeof siteMetadata.description, 'string');
  assert.ok(siteMetadata.description.length > 0, 'description must not be empty');
  assert.match(siteMetadata.url, /^https:\/\//);
  assert.equal(typeof siteMetadata.author, 'string');
});

test('gatsby-config declares the core plugins the build depends on', () => {
  const names = config.plugins.map(pluginName);
  const required = [
    'gatsby-plugin-react-helmet',
    'gatsby-source-filesystem',
    'gatsby-plugin-sharp',
    'gatsby-plugin-manifest',
    'gatsby-source-sanity',
  ];
  required.forEach((name) => {
    assert.ok(names.includes(name), `plugin '${name}' must be declared`);
  });
});
