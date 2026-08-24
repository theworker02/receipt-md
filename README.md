# receipt-md

<img src="docs/logo.svg" alt="receipt-md mark" width="96" height="96">

**Write a markdown receipt with a title, ISO timestamp, and PASS or FAIL from argv.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/receipt-md?display_name=release)
[![npm](https://img.shields.io/npm/v/@magnexis/receipt-md.svg)](https://www.npmjs.com/package/@magnexis/receipt-md)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/receipt-md/) · **Source:** [`theworker02/receipt-md`](https://github.com/theworker02/receipt-md) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/receipt-md/releases/tag/v1.0.0) · **npm:** [`@magnexis/receipt-md`](https://www.npmjs.com/package/@magnexis/receipt-md)

## Why it exists

CI logs disappear. A RECEIPT.md in the workspace is a durable, human-readable proof of the last run.

## Who it is for

Workshop graders, local CI wrappers, and anyone attaching a result file to an artifact folder.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm install -g @magnexis/receipt-md
receipt-md --help
```

Package page: https://www.npmjs.com/package/@magnexis/receipt-md

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/receipt-md.git
receipt-md --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/receipt-md.git
cd receipt-md
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/receipt-md --help
node src/cli.js --help
```

## Quick start

```bash
receipt-md "CI" pass
cat RECEIPT.md
```

## CLI reference

```text
receipt-md 1.00 (1.0.0)

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
```

Print the same text locally:

```bash
receipt-md --help
receipt-md -h
receipt-md --version
receipt-md -V
```

Expected version output:

```text
1.0.0
```

## Configuration

Default file is `./RECEIPT.md`. `--json` also writes a JSON sidecar.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | PASS receipt written. |
| `1` | FAIL receipt written, or usage error. The markdown is still written on FAIL. |

## Examples

### Success path

Write a PASS receipt.

```bash
receipt-md "CI" pass
```

```text
/abs/RECEIPT.md
```

### Failure path

FAIL receipts are still written; the process exits 1.

```bash
receipt-md --title e2e --fail --note timeout --out ./artifacts/RECEIPT.md
```

```text
./artifacts/RECEIPT.md
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/receipt-md/](https://theworker02.github.io/receipt-md/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
