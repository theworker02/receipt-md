const HELP = "receipt-md 1.00 (1.0.0)\n\nUsage:\n  receipt-md <title> <pass|fail> [file]\n  receipt-md --help\n  receipt-md --version\n\nWrites markdown:\n  # <title>\n  - timestamp: <ISO>\n  - result: PASS|FAIL\n\nDefault file: ./RECEIPT.md\nExit 0 on PASS, 1 on FAIL (file is still written).\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nExamples:\n  receipt-md \"CI\" pass\n  receipt-md \"e2e\" fail ./artifacts/RECEIPT.md\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
