const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { render, writeReceipt } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

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

  it("CLI --note --out --json writes a sidecar", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "receipt-"));
    const out = path.join(cwd, "artifacts", "RECEIPT.md");
    const result = spawnSync(
      process.execPath,
      [cli, "--title", "e2e", "--fail", "--note", "timeout", "--out", out, "--json"],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 1);
    const body = JSON.parse(result.stdout);
    assert.equal(body.pass, false);
    assert.match(fs.readFileSync(out, "utf8"), /note: timeout/);
    assert.equal(fs.existsSync(body.sidecar), true);
    fs.rmSync(cwd, { recursive: true, force: true });
  });
});
