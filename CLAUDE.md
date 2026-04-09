# Claude Code Toolkit

A reusable collection of Claude Code skills, agents, commands, and templates organized by technology.

## Toolkits

| Folder | Stack | Use when... |
|--------|-------|-------------|
| [`vite-react/`](vite-react/) | Vite + React | Working on a React frontend (components, hooks, services, stores) |
| [`nestjs/`](nestjs/) | NestJS | Working on a NestJS backend (modules, services, controllers, DTOs) |
| [`python/`](python/) | Python / FastAPI | Working on a Python backend (routers, services, schemas, helpers) |
| [`dotnet/`](dotnet/) | .NET / ASP.NET Core | Working on a .NET backend (controllers, services, DTOs, helpers) |

Install one or more depending on your project.

---

## Plugins

Reusable TypeScript code utilities that can be copied into any project.

| Plugin | Purpose |
|--------|---------|
| [`plugins/logger/`](plugins/logger/) | Leveled logger with timestamp prefix and context (main/render process) |

---

## Install

Use the install script from the root of the toolkit repo:

```bash
# Single toolkit (installs into current directory)
bash scripts/install.sh nestjs
bash scripts/install.sh vite-react

# Multiple toolkits (fullstack)
bash scripts/install.sh vite-react nestjs

# All toolkits
bash scripts/install.sh all

# Install into a specific project directory
bash scripts/install.sh nestjs --target ~/my-project
```

The script copies agents and commands into `<target>/.claude/`, and skills into `~/.claude/skills/`.

---

See each toolkit's `CLAUDE.md` for folder structure rules, naming conventions, and key patterns:
- [vite-react/CLAUDE.md](vite-react/CLAUDE.md)
- [nestjs/CLAUDE.md](nestjs/CLAUDE.md)
- [python/CLAUDE.md](python/CLAUDE.md)
- [dotnet/CLAUDE.md](dotnet/CLAUDE.md)

Plugins in [`plugins/`](plugins/) are standalone TypeScript utilities — copy them directly into your project as needed.
