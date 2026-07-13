// Converts the JSON output of `sf project deploy start --json` (a check-only
// deploy that runs local Apex tests) into a JUnit XML file that Allure can
// ingest, so Apex unit tests appear in the same report as the Playwright tests.
//
// Usage: node scripts/apex-deploy-to-junit.mjs <deploy-json> <out-dir>
import fs from 'node:fs';
import path from 'node:path';

const [, , inputPath, outDir = 'apex-junit'] = process.argv;

if (!inputPath) {
  console.error('Usage: node scripts/apex-deploy-to-junit.mjs <deploy-json> <out-dir>');
  process.exit(2);
}

const xmlEscape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const secs = (ms) => (Number(ms) || 0) / 1000;

let raw = '';
try {
  raw = fs.readFileSync(inputPath, 'utf8');
} catch {
  console.error(`Could not read ${inputPath}`);
}

let data = {};
try {
  data = raw ? JSON.parse(raw) : {};
} catch {
  // Non-JSON (e.g. the CLI errored before producing JSON) — leave data empty.
}

// The test results live under result.details.runTestResult on a validate deploy.
const result = data.result ?? {};
const rtr = result.details?.runTestResult ?? {};
const successes = asArray(rtr.successes);
const failures = asArray(rtr.failures);

const cases = [];
for (const s of successes) {
  cases.push(
    `    <testcase classname="Apex.${xmlEscape(s.name)}" name="${xmlEscape(s.methodName)}" time="${secs(s.time)}"/>`,
  );
}
for (const f of failures) {
  const detail = [f.message, f.stackTrace].filter(Boolean).map(xmlEscape).join('\n');
  cases.push(
    `    <testcase classname="Apex.${xmlEscape(f.name)}" name="${xmlEscape(f.methodName)}" time="${secs(f.time)}">\n` +
      `      <failure message="${xmlEscape(f.message)}">${detail}</failure>\n` +
      `    </testcase>`,
  );
}

// If the deploy failed before running tests (e.g. a compile error), surface that
// as a single failing case so the report doesn't silently show nothing.
if (cases.length === 0) {
  const msg =
    asArray(result.details?.componentFailures)
      .map((c) => `${c.fullName ?? c.componentType ?? ''}: ${c.problem ?? ''}`)
      .join('\n') ||
    data.message ||
    'No Apex test results were produced by the deploy.';
  cases.push(
    `    <testcase classname="Apex.Deploy" name="validation" time="0">\n` +
      `      <failure message="Apex validation produced no test results">${xmlEscape(msg)}</failure>\n` +
      `    </testcase>`,
  );
}

const total = cases.length;
const failed = failures.length + (successes.length + failures.length === 0 ? 1 : 0);
const time = secs(rtr.totalTime);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<testsuites>\n` +
  `  <testsuite name="Apex" tests="${total}" failures="${failed}" time="${time}">\n` +
  cases.join('\n') +
  `\n  </testsuite>\n` +
  `</testsuites>\n`;

fs.mkdirSync(outDir, { recursive: true });
// Allure's JUnit importer expects files ending in -junit.xml / TEST-*.xml.
const outFile = path.join(outDir, 'apex-junit.xml');
fs.writeFileSync(outFile, xml);
console.log(`Wrote ${outFile}: ${total} test(s), ${failed} failure(s).`);
