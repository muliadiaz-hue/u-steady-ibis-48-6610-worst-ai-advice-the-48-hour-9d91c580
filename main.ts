// Worst AI Advice entry — writes one 140-char-capped line to /output/entry.txt.
// Composed for u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580.
// Node 22, standard library only; deterministic: same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The advice is assembled from its two beats so the wording stays editable
// in one place: the bad action, then the tidy fake logic that sells it.
const BAD_ACTION = "If your dog eats chocolate, give him more";
const FAKE_LOGIC = "building tolerance is how immunity works.";
const EM_DASH = "\u2014"; // single code point; 3 bytes in UTF-8, counts as 1 char

function buildLine(): string {
  return `${BAD_ACTION} ${EM_DASH} ${FAKE_LOGIC}`;
}

function main(): void {
  const line = buildLine();
  // Gate counts characters, not bytes: count code points, not UTF-16 units.
  const chars = [...line].length;
  if (chars < 1 || chars > 140 || line.trim().length === 0) {
    throw new Error(`entry length ${chars} chars outside 1..140`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();
