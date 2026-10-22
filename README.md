# Blog mirror

Use Node.js 22.23.4 or a newer patch in major 22 (`nvm use`) and npm.
The CI runtime and strict npm engine floor address CVE-2026-111497.
Rebuild generated pages after runtime updates. Use local fixtures for checks;
`npm run sync` contacts the configured application API and writes pages.
