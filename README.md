# receipt-md

<img src="docs/logo.svg" alt="receipt-md mark" width="96" height="96">

**Generate durable PASS/FAIL markdown receipts with structured metadata and optional JSON sidecars.**

[![JSR](https://jsr.io/badges/@theworker02/receipt-md)](https://jsr.io/@theworker02/receipt-md)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)

**JSR:** [`@theworker02/receipt-md`](https://jsr.io/@theworker02/receipt-md) · **Docs:** [GitHub Pages](https://theworker02.github.io/receipt-md/) · **Source:** [`theworker02/receipt-md`](https://github.com/theworker02/receipt-md)

## Package API

The JSR package exposes a documented ESM API for creating build and CI receipts programmatically.

- `render()` — build markdown receipt content
- `writeReceipt()` — write markdown and optional JSON sidecar files
- documented result and options types for editor/JSR symbol documentation

```ts
import { render } from "jsr:@theworker02/receipt-md";

const markdown = render({
  title: "CI",
  pass: true,
  notes: ["tests passed"],
});

console.log(markdown);
```

## CLI

The repository CLI remains available for Node.js 18+:

```bash
git clone https://github.com/theworker02/receipt-md.git
cd receipt-md
node src/cli.js --help
```

Example:

```bash
node src/cli.js "CI" pass
cat RECEIPT.md
```

## Development

```bash
npm test
```

The public package is published to JSR through GitHub Actions trusted publishing with OIDC. No long-lived publishing secret is stored in the repository.

## GitHub Pages

https://theworker02.github.io/receipt-md/

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against `main`.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
