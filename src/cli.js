#!/usr/bin/env node
const { writeReceipt } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

const [title, result, dest] = args.filter((a) => !a.startsWith("-"));
if (!title || !result) {
  process.stderr.write("usage: receipt-md <title> <pass|fail> [file]\n");
  process.exit(1);
}
const pass = /^(pass|ok|true|1)$/i.test(result);
if (!pass && !/^(fail|false|0)$/i.test(result)) {
  process.stderr.write("result must be pass or fail\n");
  process.exit(1);
}
const written = writeReceipt({ title, pass, dest });
process.stdout.write(`${written.file}\n`);
process.exit(pass ? 0 : 1);
