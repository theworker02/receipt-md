# receipt-md

<img src="docs/logo.svg" alt="receipt-md mark" width="96" height="96">

**Write a markdown receipt with a title, ISO timestamp, and PASS or FAIL from argv.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/receipt-md?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/receipt-md/) · **Source:** [`theworker02/receipt-md`](https://github.com/theworker02/receipt-md) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/receipt-md/releases/tag/v1.0.0)

## Why it exists

CI logs disappear. A RECEIPT.md in the workspace is a durable, human-readable proof of the last run.

## Who it is for

Workshop graders, local CI wrappers, and anyone attaching a result file to an artifact folder.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/receipt-md.git --help
node src/cli.js --help
```

## Quick start

```bash
receipt-md "CI" pass
cat RECEIPT.md
```

## CLI reference

Synopsis:

```text
receipt-md [options] <title> <pass|fail> [file]
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `<title>` | Heading written as # title. |
| `<pass|fail>` | pass/ok/true/1 → PASS; fail/false/0 → FAIL. |
| `[file]` | Output path. Default: ./RECEIPT.md |

Print the same text locally:

```bash
receipt-md --help
receipt-md --version
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration file. The process exit code matches the receipt: 0 for PASS, 1 for FAIL (after the file is written).

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Receipt written and result is PASS. |
| `1` | Bad usage, or receipt written as FAIL. |

## Examples

### Success path

```bash
receipt-md "nightly" pass
```

```markdown
# nightly

- timestamp: 2026-08-23T16:00:00.000Z
- result: PASS
```

### Failure path

```bash
receipt-md "nightly" fail ; echo exit:$?
```

The file is still written with result FAIL. Exit code is 1.

Missing title:

```bash
receipt-md
usage: receipt-md <title> <pass|fail> [file]
```

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
