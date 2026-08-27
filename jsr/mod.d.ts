/** Create durable Markdown verification receipts and optional JSON sidecars. @module */
export interface ReceiptData { title: string; pass: boolean; result: "PASS" | "FAIL"; timestamp: string; notes: string[]; }
export interface ReceiptOptions { title: string; pass: boolean; now?: Date; notes?: string[]; }
export interface WriteReceiptOptions extends ReceiptOptions { dest?: string; cwd?: string; jsonSidecar?: boolean; }
export interface ReceiptWriteResult { file: string; body: string; pass: boolean; sidecar: string | null; notes: string[]; timestamp: string; result: "PASS" | "FAIL"; }
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/receipt-md"; version: "1.1.0"; runtime: "node"; registry: "jsr" }>;
/** Default Markdown receipt filename. */
export const DEFAULT_RECEIPT_FILE: "RECEIPT.md";
/** Convert a boolean result into PASS or FAIL. */
export function resultLabel(pass: boolean): "PASS" | "FAIL";
/** Normalize receipt input into structured data. */
export function createReceiptData(options: ReceiptOptions): ReceiptData;
/** Render a receipt as Markdown. */
export function render(options: ReceiptOptions): string;
/** Write a Markdown receipt and optionally a JSON sidecar. */
export function writeReceipt(options: WriteReceiptOptions): ReceiptWriteResult;
