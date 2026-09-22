# Buyer evaluation â€” receipt-md

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
```ts
import { render } from "jsr:@theworker02/receipt-md";

const markdown = render({
  title: "CI",
  pass: true,
  notes: ["tests passed"],
});

console.log(markdown);
```
```bash
git clone https://github.com/theworker02/receipt-md.git
cd receipt-md
node src/cli.js --help
```
```bash
node src/cli.js "CI" pass
cat RECEIPT.md
```
```bash
npm test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*
