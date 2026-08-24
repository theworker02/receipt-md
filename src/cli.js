#!/usr/bin/env node
const { writeReceipt } = require("./index.js");

const [title, result, dest] = process.argv.slice(2);
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
