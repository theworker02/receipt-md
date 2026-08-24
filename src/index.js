const fs = require("node:fs");
const path = require("node:path");

function render({ title, pass, now = new Date() }) {
  const result = pass ? "PASS" : "FAIL";
  return `# ${title}

- timestamp: ${now.toISOString()}
- result: ${result}
`;
}

function writeReceipt({ title, pass, now, dest, cwd = process.cwd() }) {
  const file = dest ? path.resolve(dest) : path.resolve(cwd, "RECEIPT.md");
  const body = render({ title, pass, now });
  fs.writeFileSync(file, body);
  return { file, body, pass: Boolean(pass) };
}

module.exports = { render, writeReceipt };
