// Summarizes a Playwright JSON report into Markdown: time per spec file and
// browser, retried/flaky tests, and the slowest tests.
// Usage: node scripts/playwright-timing-summary.mjs [path/to/results.json]
import { readFileSync } from "node:fs";

const reportPath = process.argv[2] ?? "playwright-json/results.json";
const report = JSON.parse(readFileSync(reportPath, "utf8"));

const fmt = (ms) => `${(ms / 1000).toFixed(1)}s`;

// Flatten nested suites into one row per test per browser project.
const rows = [];
const walk = (suite) => {
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const results = test.results ?? [];
      rows.push({
        file: spec.file,
        title: spec.title,
        project: test.projectName,
        status: test.status,
        attempts: results.length,
        duration: results.reduce((sum, r) => sum + (r.duration ?? 0), 0),
      });
    }
  }
  for (const child of suite.suites ?? []) walk(child);
};
for (const suite of report.suites ?? []) walk(suite);

const projects = [...new Set(rows.map((r) => r.project))].sort();
const files = [...new Set(rows.map((r) => r.file))].sort();
const sum = (list) => list.reduce((total, r) => total + r.duration, 0);

const out = [];
const { stats = {} } = report;
out.push("## Playwright timing summary", "");
out.push(
  `Wall time: **${fmt(stats.duration ?? 0)}** · Summed test time: **${fmt(sum(rows))}** · ` +
    `Workers: ${report.config?.metadata?.actualWorkers ?? report.config?.workers ?? "?"} · ` +
    `Tests: ${rows.length} (expected ${stats.expected ?? 0}, flaky ${stats.flaky ?? 0}, ` +
    `unexpected ${stats.unexpected ?? 0}, skipped ${stats.skipped ?? 0})`,
  ""
);

out.push("### Time by spec file and browser", "");
out.push(`| File | ${projects.join(" | ")} | Total |`);
out.push(`|---|${projects.map(() => "---:").join("|")}|---:|`);
for (const file of files) {
  const inFile = rows.filter((r) => r.file === file);
  const cells = projects.map((p) => fmt(sum(inFile.filter((r) => r.project === p))));
  out.push(`| ${file} | ${cells.join(" | ")} | ${fmt(sum(inFile))} |`);
}
const projectTotals = projects.map((p) => `**${fmt(sum(rows.filter((r) => r.project === p)))}**`);
out.push(`| **Total** | ${projectTotals.join(" | ")} | **${fmt(sum(rows))}** |`, "");

const retried = rows.filter((r) => r.attempts > 1).sort((a, b) => b.duration - a.duration);
out.push(`### Retried tests (${retried.length})`, "");
if (retried.length === 0) {
  out.push("None.", "");
} else {
  out.push("| Test | Browser | Attempts | Status | Time |", "|---|---|---:|---|---:|");
  for (const r of retried) {
    out.push(`| ${r.file} › ${r.title} | ${r.project} | ${r.attempts} | ${r.status} | ${fmt(r.duration)} |`);
  }
  out.push("");
}

const slowest = [...rows].sort((a, b) => b.duration - a.duration).slice(0, 15);
out.push("### Slowest tests", "");
out.push("| Test | Browser | Time |", "|---|---|---:|");
for (const r of slowest) out.push(`| ${r.file} › ${r.title} | ${r.project} | ${fmt(r.duration)} |`);

console.log(out.join("\n"));
