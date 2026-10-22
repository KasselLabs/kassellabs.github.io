# Repository instructions

## Node runtime security

Use Node.js 24.22.1 or a newer security patch within major 24 for
local builds (see `.nvmrc`). Exact runtime inputs address CVE-2026-111497;
keep the pins aligned and rebuild artifacts after runtime updates.
The blog workflow checks out `engineering-pages` and uses patched Node 22.
This predecessor site is distinct from the current `KasselLabs/kassellabs.io`
monorepo. Installation hooks and blog sync can fetch live application data;
use `npm ci --ignore-scripts` for isolated checks and never run them as a test.

`assert-node-runtime.cjs` fails closed before install/build/development/serve
(and direct mirror sync) on unsupported or unpatched Node. Older npm 6 can
ignore root engine constraints during `ci`; keep these executable guards and
exact CI selectors. `npm run test:runtime` checks the supported security floors.
