const HELP = `receipt-md 1.00 (1.0.0)

Usage:
  receipt-md [options] <title> <pass|fail> [file]
  receipt-md --title <title> --pass|--fail [--note text] [--out file]

Write a markdown receipt:
  # <title>
  - timestamp: <ISO>
  - result: PASS|FAIL
  - note: ...   (optional, repeatable)

Default file: ./RECEIPT.md
Exit 0 on PASS, 1 on FAIL (the file is still written).

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --title <text>     Receipt title
  --pass / --fail    Result (aliases: pass|ok|true|1 and fail|false|0)
  --note <text>      Extra note line (repeatable)
  --out <file>       Output markdown path
  --json             Also write a JSON sidecar next to the markdown
                     (and print JSON to stdout)

Examples:
  receipt-md "CI" pass
  receipt-md --title e2e --fail --note "timeout" --out ./artifacts/RECEIPT.md
  receipt-md "build" pass --json
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
