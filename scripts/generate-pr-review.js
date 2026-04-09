#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ===== CONFIG =====
const BASE_BRANCH = process.argv[2] || "main";
const TARGET_BRANCH = process.argv[3] || "HEAD";
const OUTPUT_FILE = "output/pr-review.md";

// limits to reduce token usage
const MAX_FILES = 50;
const MAX_LINES_PER_FILE = 500;
const MAX_FILES_PER_CHUNK = 10; // split into multiple part files when exceeded
const IGNORE_SUFFIXES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  ".min.js",
  ".min.css",
  ".generated.ts",
  ".generated.js",
];
const IGNORE_CONTAINS = [".lock"];
const IGNORE_DIR_PREFIXES = [
  "dist/",
  "build/",
  ".next/",
  "out/",
  "src/generated/",
  "__generated__/",
];

// ===== HELPERS =====

function run(cmd) {
  return execSync(cmd, { encoding: "utf-8" }).trim();
}

function shouldIgnore(file) {
  if (IGNORE_SUFFIXES.some((s) => file.endsWith(s))) return true;
  if (IGNORE_CONTAINS.some((s) => file.includes(s))) return true;
  if (IGNORE_DIR_PREFIXES.some((p) => file.startsWith(p) || file.includes("/" + p))) return true;
  return false;
}

function truncateLines(content, maxLines) {
  const lines = content.split("\n");
  if (lines.length <= maxLines) return content;
  return (
    lines.slice(0, maxLines).join("\n") +
    `\n... (truncated ${lines.length - maxLines} lines)`
  );
}

// ===== MAIN =====

function getChangedFiles() {
  try {
    const output = run(`git diff --name-only ${BASE_BRANCH}...${TARGET_BRANCH}`);
    return output.split("\n").filter(Boolean);
  } catch (e) {
    console.error(`Error: failed to get changed files — ${e.message}`);
    process.exit(1);
  }
}

function getDiffStat() {
  try {
    return run(`git diff --stat ${BASE_BRANCH}...${TARGET_BRANCH}`);
  } catch {
    return "(unavailable)";
  }
}

function getDiffForFile(file) {
  try {
    const quoted = `"${file.replace(/"/g, '\\"')}"`;
    const diff = run(`git diff ${BASE_BRANCH}...${TARGET_BRANCH} -- ${quoted}`);
    return truncateLines(diff, MAX_LINES_PER_FILE);
  } catch (e) {
    return `Error getting diff for ${file}`;
  }
}

function generateFilesSection(filesWithDiff) {
  return filesWithDiff
    .map(
      ({ file, diff }) => `
### ${file}

\`\`\`diff
${diff}
\`\`\`
`
    )
    .join("\n");
}

function generatePrompt(filesWithDiff, diffStat, partInfo = null) {
  const totalFiles = partInfo ? partInfo.totalFiles : filesWithDiff.length;
  const partHeader = partInfo
    ? `Part ${partInfo.part} of ${partInfo.total} — files ${partInfo.from}–${partInfo.to} of ${totalFiles}`
    : null;

  const contextSection = `# PR Review${partHeader ? ` (${partHeader})` : ""}

## Context
- Base branch: ${BASE_BRANCH}
- Target branch: ${TARGET_BRANCH}
- Files changed: ${totalFiles}${partHeader ? `\n- This part: files ${partInfo.from}–${partInfo.to}` : ""}

### Diff Stat

\`\`\`
${diffStat}
\`\`\`

---

## Instructions for Reviewer

You are a senior engineer reviewing this pull request.

Review scope:
- Code quality & readability
- Architecture & design decisions
- Performance & scalability
- Edge cases & error handling
- Security concerns
- Consistency with existing patterns
- Test coverage

---`;

  const filesSection = `## Changed Files

${generateFilesSection(filesWithDiff)}

---`;

  const isLastPart = !partInfo || partInfo.part === partInfo.total;
  const outputFormat = isLastPart
    ? `## Output Format

### 1. Summary

What this PR does and its overall assessment.

**Overall:** Good / Needs improvement / Risky

### 2. Major Issues

> Critical bugs, bad architecture decisions, breaking changes, performance risks.

### 3. Minor Issues

> Naming, readability, small refactors.

### 4. Suggestions

> Improvements and alternative approaches worth considering.

### 5. Questions

> Things that are unclear or need clarification from the author.

### 6. Risk Level

**Low / Medium / High** — _one-line rationale_

### 7. Final Recommendation

**Approve** / **Request Changes** / **Comment Only**
`
    : `> Continue reading the next part before writing your review.\n`;

  return [contextSection, filesSection, outputFormat].join("\n");
}

// ===== EXECUTION =====

function main() {
  console.log("🔍 Generating PR review file...");

  let files = getChangedFiles();

  // filter ignored files
  files = files.filter((f) => !shouldIgnore(f));

  // limit number of files
  if (files.length > MAX_FILES) {
    console.log(`⚠️ Too many files (${files.length}), truncating to ${MAX_FILES}`);
    files = files.slice(0, MAX_FILES);
  }

  const diffStat = getDiffStat();
  const filesWithDiff = files.map((file) => ({
    file,
    diff: getDiffForFile(file),
  }));

  // ensure output dir exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

  const chunks = [];
  for (let i = 0; i < filesWithDiff.length; i += MAX_FILES_PER_CHUNK) {
    chunks.push(filesWithDiff.slice(i, i + MAX_FILES_PER_CHUNK));
  }

  if (chunks.length === 1) {
    const content = generatePrompt(filesWithDiff, diffStat);
    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`✅ PR review file saved to ${OUTPUT_FILE}`);
  } else {
    const ext = path.extname(OUTPUT_FILE);
    const base = OUTPUT_FILE.slice(0, -ext.length);
    chunks.forEach((chunk, idx) => {
      const part = idx + 1;
      const partFile = `${base}-part${part}${ext}`;
      const partInfo = {
        part,
        total: chunks.length,
        from: idx * MAX_FILES_PER_CHUNK + 1,
        to: idx * MAX_FILES_PER_CHUNK + chunk.length,
        totalFiles: filesWithDiff.length,
      };
      const content = generatePrompt(chunk, diffStat, partInfo);
      fs.writeFileSync(partFile, content);
      console.log(`✅ Part ${part}/${chunks.length} saved to ${partFile}`);
    });
  }
}

main();
