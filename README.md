# Kassel Labs Website

[http://kassellabs.io](http://kassellabs.io)

Use Node.js 24.22.1 or a newer patch within major 24 (`nvm use`).
The blog-mirror workflow builds `engineering-pages` with patched Node 22.
Rebuild artifacts after runtime updates; this is the predecessor website.

## Deploy Steps

Follow these steps:

1. Development should commit to `develop` branch.
2. Then, pull request to `master-pre-build` branch.
3. Once merged, it will deploy to `master` branch.

## Environment Variables

Setup the environment variables in a `.env` file.

- **SANITY_TOKEN** : Token for reading data in Sanity.
- **FACEBOOK_PIXEL**: Id for Facebook Pixel
