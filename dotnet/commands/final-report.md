---
name: final-report
description: Synthesize all module analyses and cross-analysis into analysis/FINAL-AUDIT-REPORT.md with executive summary, scored findings, and recommendations.
---

You are generating the final audit report for an ASP.NET Core codebase.

## Argument Parsing

Parse `$ARGUMENTS` by splitting on spaces then `=`. Extract:

- `out` → output directory (default: `analysis`)

## Step 1 — Load All Inputs

1. Read `<out>/cross-analysis.md`
2. Use `Glob` on `<out>/[0-9][0-9]-*.md` to find all module analysis files. Read all of them.
3. Read `*.csproj` or `*.sln` from the project root to extract the project name. If neither is found, use the current working directory name.

## Step 2 — Compute Aggregate Scores

From each module file, parse the `## Score (1–10)` section. Extract the four numeric scores (Architecture, Code Quality, Performance, API Design).

Compute the **mean** for each dimension across all modules. Round to one decimal place.

Create a score summary:

| Dimension    | Mean Score |
| ------------ | ---------- |
| Architecture | X.X        |
| Code Quality | X.X        |
| Performance  | X.X        |
| API Design   | X.X        |

## Step 3 — Synthesize Report Content

Using the cross-analysis and module analyses, prepare content for each section below. Be specific — cite module names. The executive summary should reflect the actual findings.

**For the Key Issues Top 5 table:** Identify the five highest-impact issues from across all modules. Rank by: (1) severity, (2) number of modules affected, (3) technical risk. Each issue needs a concrete recommendation.

**For Quick Wins:** Identify low-effort, high-ROI improvements — things that can be fixed in a day or less with clear positive impact. Prefer fixes at shared boundaries (interfaces, DTOs, DI registration, Swagger).

**For Scoring justifications:** Each dimension's justification should describe the specific patterns that drove the score up or down, citing module names where relevant.

## Step 4 — Write Output

Write to `<out>/FINAL-AUDIT-REPORT.md` using this exact structure:

```markdown
# <Project Name> — Final Backend Audit Report

**Scope:** Cross-module synthesis of <N> analyses from `<out>/`.
**Date:** <YYYY-MM-DD>
**Stack:** .NET 8 / ASP.NET Core / Entity Framework Core
**Focus:** Patterns across modules, not per-module detail.

---

## 1. Executive Summary

- **Overall backend quality:** <2-3 sentence assessment of the codebase maturity, dominant patterns, and main trade-offs>

- **Key strengths:** <3 bullet points — concrete, specific to this codebase>

- **Top 3 critical issues:**
  1. **<Issue title>** — <one-line description>
  2. **<Issue title>** — <one-line description>
  3. **<Issue title>** — <one-line description>

- **Recommendation:** <1-2 sentences on the highest-leverage architectural direction>

---

## 2. Cross-Module Findings

### Architecture

<Draw from cross-analysis Architecture Patterns section. 3-6 bullet points.>

### Service & Business Logic

<Draw from cross-analysis Service & Business Logic section. 3-6 bullet points.>

### API & Data Flow

<Draw from cross-analysis API & Data Flow section. 3-6 bullet points.>

### Error Handling

<Draw from cross-analysis Error Handling Consistency section. 3-6 bullet points.>

### Performance

<Draw from cross-analysis Performance section. 3-6 bullet points.>

---

## 3. Key Issues (Top 5)

| #   | Title   | Severity     | Affected modules (representative) | Recommendation   |
| --- | ------- | ------------ | --------------------------------- | ---------------- |
| 1   | <title> | **Critical** | <modules>                         | <recommendation> |
| 2   | <title> | **High**     | <modules>                         | <recommendation> |
| 3   | <title> | **High**     | <modules>                         | <recommendation> |
| 4   | <title> | **High**     | <modules>                         | <recommendation> |
| 5   | <title> | **High**     | <modules>                         | <recommendation> |

---

## 4. Risks & Technical Debt

- <risk 1>
- <risk 2>
- <risk 3>
- <risk 4>
- <risk 5>

---

## 5. Quick Wins

- <quick win 1>
- <quick win 2>
- <quick win 3>
- <quick win 4>

---

## 6. Long-Term Recommendations

- **<Theme>:** <recommendation>
- **<Theme>:** <recommendation>
- **<Theme>:** <recommendation>
- **<Theme>:** <recommendation>
- **<Theme>:** <recommendation>

---

## 7. Scoring (1–10)

| Dimension        | Score   | Justification                          |
| ---------------- | ------- | -------------------------------------- |
| **Architecture** | **X.X** | <one sentence — what drove this score> |
| **Code Quality** | **X.X** | <one sentence>                         |
| **Performance**  | **X.X** | <one sentence>                         |
| **API Design**   | **X.X** | <one sentence>                         |

---

_Generated from module-level analyses in this directory; revise when underlying analyses change._
```

After writing, confirm: "Written: `<out>/FINAL-AUDIT-REPORT.md`"
