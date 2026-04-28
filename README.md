# Claude Code Toolkit

A reusable collection of Claude Code skills, agents, commands, and templates organized by technology stack.


## Install

Run from this repo's root, targeting your project directory.

### Vite/React Frontend

```bash
mkdir -p .claude/agents .claude/commands
cp vite-react/agents/*.md .claude/agents/
cp -r vite-react/skills/* ~/.claude/skills/
cp vite-react/commands/*.md .claude/commands/
```

### NestJS Backend

```bash
mkdir -p .claude/agents .claude/commands
cp nestjs/agents/*.md .claude/agents/
cp -r nestjs/skills/* ~/.claude/skills/
cp nestjs/commands/*.md .claude/commands/
```

### Python Backend

```bash
mkdir -p .claude/agents .claude/commands
cp python/agents/*.md .claude/agents/
cp -r python/skills/* ~/.claude/skills/
cp python/commands/*.md .claude/commands/
```

### .NET Backend

```bash
mkdir -p .claude/agents .claude/commands
cp dotnet/agents/*.md .claude/agents/
cp -r dotnet/skills/* ~/.claude/skills/
cp dotnet/commands/*.md .claude/commands/
```

### Both (Fullstack)

```bash
mkdir -p .claude/agents .claude/commands
cp vite-react/agents/*.md nestjs/agents/*.md .claude/agents/
cp -r vite-react/skills/* nestjs/skills/* ~/.claude/skills/
cp vite-react/commands/*.md nestjs/commands/*.md .claude/commands/
```

---

## What's Included

### Skills

Skills are auto-triggered behaviors that guide Claude before creating new files.

| Skill | Stack | Triggers when... |
|-------|-------|-----------------|
| `frontend-feature` | Vite/React | Creating components, pages, hooks, services, stores |
| `backend-module` | NestJS | Creating modules, services, controllers, DTOs, guards |
| `backend-module` | Python | Creating modules, services, routers, schemas, helpers |
| `backend-module` | .NET | Creating modules, services, controllers, DTOs, helpers |

### Agents

Agents are sub-agents invoked by skills to enforce project conventions.

| Agent | Stack | Purpose |
|-------|-------|---------|
| `frontend-dev` | Vite/React | Enforce feature folder structure and naming |
| `backend-dev` | NestJS | Enforce NestJS module structure and naming |
| `backend-dev` | Python | Enforce Python module structure and naming |
| `backend-dev` | .NET | Enforce .NET module structure and naming |

### Commands

Slash commands available in Claude Code sessions.

**Shared (both stacks)**

| Command | Usage | Purpose |
|---------|-------|---------|
| `/analyze-project` | `/analyze-project` | Full project structure analysis |
| `/cross-analysis` | `/cross-analysis` | Frontend ↔ backend cross-layer analysis |
| `/sync-docs` | `/sync-docs [--cron <interval>]` | Sync docs or schedule automatic extraction |
| `/final-report` | `/final-report` | Generate a final implementation report |
| `/review-pr` | `/review-pr base=<branch> head=<branch>` | Review code changes between two branches |

**Vite/React**

| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-feature` | `/new-feature <name>` | Scaffold a new feature folder |
| `/extract-features` | `/extract-features [name]` | Extract feature docs to `docs/features/` |
| `/scan-reusables-frontend` | `/scan-reusables-frontend <task>` | Scan for reusable components, hooks, services |
| `/check-conventions-frontend` | `/check-conventions-frontend [path]` | Validate folder structure and naming |
| `/analyze-feature` | `/analyze-feature <name>` | Deep-dive analysis of a specific feature |

**NestJS**

| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-module` | `/new-module <name>` | Scaffold a new NestJS module |
| `/extract-modules` | `/extract-modules [name]` | Extract module docs to `docs/modules/` |
| `/scan-reusables-backend` | `/scan-reusables-backend <task>` | Scan for reusable services, guards, DTOs |
| `/check-conventions-backend` | `/check-conventions-backend [path]` | Validate folder structure and naming |

**Python**

| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-module` | `/new-module <name>` | Scaffold a new Python module |
| `/extract-modules` | `/extract-modules [name]` | Extract module docs to `docs/modules/` |
| `/scan-reusables-backend` | `/scan-reusables-backend <task>` | Scan for reusable services, schemas, helpers |
| `/check-conventions-backend` | `/check-conventions-backend [path]` | Validate folder structure and naming |

**.NET**

| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-module` | `/new-module <Name>` | Scaffold a new .NET module |
| `/extract-modules` | `/extract-modules [Name]` | Extract module docs to `docs/modules/` |
| `/scan-reusables-backend` | `/scan-reusables-backend <task>` | Scan for reusable services, interfaces, DTOs |
| `/check-conventions-backend` | `/check-conventions-backend [path]` | Validate folder structure and naming |

---

## Scripts

### `scripts/generate-pr-review.js`

Generates a structured PR review prompt file from git diffs — useful for feeding into Claude for a thorough code review.

```bash
node scripts/generate-pr-review.js [base-branch] [target-branch]
# Example:
node scripts/generate-pr-review.js main feature/my-branch
```

Output is saved to `output/pr-review.md`. Open that file in Claude Code and run `/review-pr` or paste it directly into a session.

**What it does:**
- Diffs `base..target`, filters out lock files, build artifacts, and generated files
- Caps at 50 files / 500 lines per file to keep token usage reasonable
- Produces a structured prompt with diff stat, per-file diffs, and a review output template

---

## Toolkit Details

- [vite-react/CLAUDE.md](vite-react/CLAUDE.md) — folder structure, naming conventions, key patterns
- [nestjs/CLAUDE.md](nestjs/CLAUDE.md) — module structure, naming conventions, key patterns
- [python/CLAUDE.md](python/CLAUDE.md) — module structure, naming conventions, Swagger, key patterns
- [dotnet/CLAUDE.md](dotnet/CLAUDE.md) — module structure, naming conventions, Swagger, key patterns
- [plugins/](plugins/) — standalone TypeScript utilities (copy as needed)
