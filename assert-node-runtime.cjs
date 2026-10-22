"use strict";

const floors = { 22: [23, 4], 24: [22, 1], 26: [12, 1] };

function assertNodeRuntime(version = process.versions.node) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  const values = match && match.slice(1).map(Number);
  const floor = values && floors[values[0]];
  if (!floor || values[1] < floor[0] || (values[1] === floor[0] && values[2] < floor[1])) {
    throw new Error("CVE-2026-111497: use patched Node.js 22.23.4, 24.22.1 or 26.12.1 (or a newer patch within those majors) before installing or building this project.");
  }
}

assertNodeRuntime();
module.exports = { assertNodeRuntime };
