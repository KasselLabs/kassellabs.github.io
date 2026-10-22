"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { assertNodeRuntime } = require("./assert-node-runtime.cjs");

for (const version of ["22.23.4", "22.24.0", "24.22.1", "24.23.0", "26.12.1", "26.13.0"]) {
  test(`accepts patched Node ${version}`, () => assert.doesNotThrow(() => assertNodeRuntime(version)));
}
for (const version of ["14.21.3", "18.20.8", "20.20.2", "22.23.3", "24.22.0", "26.12.0", "25.0.0", "invalid"]) {
  test(`rejects unsafe Node ${version}`, () => assert.throws(() => assertNodeRuntime(version), /CVE-2026-111497/));
}
