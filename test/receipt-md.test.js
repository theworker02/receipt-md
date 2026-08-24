const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { render, writeReceipt } = require("../src/index.js");

describe("receipt-md", () => {
  it("renders title, timestamp, and pass/fail", () => {
    const md = render({ title: "CI", pass: true, now: new Date("2026-08-23T12:00:00Z") });
    assert.match(md, /^# CI/m);
    assert.match(md, /2026-08-23T12:00:00.000Z/);
    assert.match(md, /result: PASS/);
  });

  it("writes RECEIPT.md", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "receipt-"));
    const { file } = writeReceipt({ title: "build", pass: false, cwd, now: new Date("2026-08-23T12:00:00Z") });
    assert.equal(path.basename(file), "RECEIPT.md");
    assert.match(fs.readFileSync(file, "utf8"), /FAIL/);
    fs.rmSync(cwd, { recursive: true, force: true });
  });
});
