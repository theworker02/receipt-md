/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";
import path from "node:path";

export const PACKAGE = Object.freeze({ name: "@theworker02/receipt-md", version: "1.1.0", runtime: "node", registry: "jsr" });
export const DEFAULT_RECEIPT_FILE = "RECEIPT.md";

export function resultLabel(pass) { return pass ? "PASS" : "FAIL"; }

export function createReceiptData({ title, pass, now = new Date(), notes = [] }) {
  if (!title) throw new Error("title is required");
  return { title, pass: Boolean(pass), result: resultLabel(pass), timestamp: now.toISOString(), notes: [...notes] };
}

export function render({ title, pass, now = new Date(), notes = [] }) {
  const data = createReceiptData({ title, pass, now, notes });
  const extra = data.notes.map((note) => `- note: ${note}`).join("\n");
  return `# ${data.title}\n\n- timestamp: ${data.timestamp}\n- result: ${data.result}${extra ? `\n${extra}` : ""}\n`;
}

export function writeReceipt({ title, pass, now, dest, cwd = process.cwd(), notes = [], jsonSidecar = false }) {
  const data = createReceiptData({ title, pass, now: now || new Date(), notes });
  const file = dest ? path.resolve(dest) : path.resolve(cwd, DEFAULT_RECEIPT_FILE);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const body = render({ title: data.title, pass: data.pass, now: new Date(data.timestamp), notes: data.notes });
  fs.writeFileSync(file, body);
  let sidecar = null;
  if (jsonSidecar) {
    sidecar = file.replace(/\.md$/i, ".json");
    if (sidecar === file) sidecar = `${file}.json`;
    fs.writeFileSync(sidecar, `${JSON.stringify({ ...data, markdown: file }, null, 2)}\n`);
  }
  return { file, body, pass: data.pass, sidecar, notes: data.notes, timestamp: data.timestamp, result: data.result };
}
