const fs = require("node:fs");
const path = require("node:path");

function render({ title, pass, now = new Date(), notes = [] }) {
  const result = pass ? "PASS" : "FAIL";
  const extra = notes.map((note) => `- note: ${note}`).join("\n");
  return `# ${title}

- timestamp: ${now.toISOString()}
- result: ${result}${extra ? `\n${extra}` : ""}
`;
}

function writeReceipt({ title, pass, now, dest, cwd = process.cwd(), notes = [], jsonSidecar = false }) {
  if (!title) throw new Error("title is required");
  const file = dest ? path.resolve(dest) : path.resolve(cwd, "RECEIPT.md");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const body = render({ title, pass, now, notes });
  fs.writeFileSync(file, body);
  let sidecar = null;
  if (jsonSidecar) {
    sidecar = file.replace(/\.md$/i, ".json");
    if (sidecar === file) sidecar = `${file}.json`;
    fs.writeFileSync(sidecar, `${JSON.stringify({
      title,
      pass: Boolean(pass),
      result: pass ? "PASS" : "FAIL",
      timestamp: (now || new Date()).toISOString(),
      notes,
      markdown: file,
    }, null, 2)}\n`);
  }
  return { file, body, pass: Boolean(pass), sidecar, notes };
}

module.exports = { render, writeReceipt };
