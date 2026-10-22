# Kassel Labs Website

[http://kassellabs.io](http://kassellabs.io)

Use Node.js 22.23.4 or a newer patch within major 22 (`nvm use`).
The strict npm engine floor rejects older build runtimes. Rebuild artifacts
after runtime updates. This is the predecessor Gatsby website.
## Deploy

Follow these steps:

1. Development should commit to `develop` branch.
2. Then, pull request to `master-pre-build` branch.
3. Once merged, it will deploy to `master` branch.

## Environment Variables

Setup the environment variables in a `.env` file.

- **SANITY_TOKEN** : Token for reading data in Sanity.
- **FACEBOOK_PIXEL**: Id for Facebook Pixel
