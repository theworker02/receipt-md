#!/usr/bin/env node
const { writeReceipt } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = { notes: [] };
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--pass") flags.pass = true;
    else if (arg === "--fail") flags.fail = true;
    else if (arg === "--title") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --title requires a value");
      flags.title = next;
      i += 1;
    } else if (arg.startsWith("--title=")) flags.title = arg.slice("--title=".length);
    else if (arg === "--note") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --note requires a value");
      flags.notes.push(next);
      i += 1;
    } else if (arg.startsWith("--note=")) flags.notes.push(arg.slice("--note=".length));
    else if (arg === "--out") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --out requires a path");
      flags.out = next;
      i += 1;
    } else if (arg.startsWith("--out=")) flags.out = arg.slice("--out=".length);
    else if (arg.startsWith("-")) throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

function parseResult(value) {
  if (value == null) return null;
  if (/^(pass|ok|true|1)$/i.test(value)) return true;
  if (/^(fail|false|0)$/i.test(value)) return false;
  throw new Error("result must be pass or fail");
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

try {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    process.exit(0);
  }

  const title = flags.title || positional[0];
  let pass = null;
  if (flags.pass) pass = true;
  else if (flags.fail) pass = false;
  else pass = parseResult(flags.title ? positional[0] : positional[1]);

  let out = flags.out;
  if (!out) {
    if (flags.title && flags.pass !== true && flags.fail !== true) out = positional[1];
    else if (flags.title) out = positional[0];
    else out = positional[2];
  }

  if (!title || pass == null) fail("usage: receipt-md <title> <pass|fail> [file]");
  const written = writeReceipt({
    title,
    pass,
    dest: out,
    notes: flags.notes,
    jsonSidecar: Boolean(flags.json),
  });
  if (flags.json) {
    process.stdout.write(`${JSON.stringify({
      file: written.file,
      sidecar: written.sidecar,
      pass: written.pass,
      notes: written.notes,
    }, null, 2)}\n`);
  } else {
    process.stdout.write(`${written.file}\n`);
  }
  process.exit(pass ? 0 : 1);
} catch (err) {
  fail(err.message);
}
