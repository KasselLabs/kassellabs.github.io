# Repository instructions

Use Node.js 22.23.4 or a newer patch in major 22 for CVE-2026-111497.
Keep `.nvmrc`, exact CI pins and the strict npm engine floor aligned. Rebuild
artifacts after runtime updates. This is a predecessor/static mirror source.
Never run CMS refresh, publication or live application requests as tests; use
local fixtures. Legacy Gatsby full builds additionally require compatible
native dependencies and CMS assets; a version pin is not a build guarantee.

`assert-node-runtime.cjs` fails closed before install/build/development/serve
(and direct mirror sync) on unsupported or unpatched Node. Older npm 6 can
ignore root engine constraints during `ci`; keep these executable guards and
exact CI selectors. `npm run test:runtime` checks the supported security floors.
