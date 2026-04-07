# Claude Code Toolkit

A reusable collection of Claude Code skills, agents, commands, and templates organized by technology.

## Toolkits

| Folder | Stack | Use when... |
|--------|-------|-------------|
| [`vite-react/`](vite-react/) | Vite + React | Working on a React frontend (components, hooks, services, stores) |
| [`nestjs/`](nestjs/) | NestJS | Working on a NestJS backend (modules, services, controllers, DTOs) |

Install one or both depending on your project.

---

## Install — Vite/React Frontend

```bash
mkdir -p .claude/agents .claude/commands
cp vite-react/agents/*.md .claude/agents/
cp -r vite-react/skills/* ~/.claude/skills/
cp vite-react/commands/*.md .claude/commands/
```

## Install — NestJS Backend

```bash
mkdir -p .claude/agents .claude/commands
cp nestjs/agents/*.md .claude/agents/
cp -r nestjs/skills/* ~/.claude/skills/
cp nestjs/commands/*.md .claude/commands/
```

## Install — Both (Fullstack)

```bash
mkdir -p .claude/agents .claude/commands
cp vite-react/agents/*.md nestjs/agents/*.md .claude/agents/
cp -r vite-react/skills/* nestjs/skills/* ~/.claude/skills/
cp vite-react/commands/*.md nestjs/commands/*.md .claude/commands/
```

---

See each toolkit's `CLAUDE.md` for folder structure rules, naming conventions, and key patterns:
- [vite-react/CLAUDE.md](vite-react/CLAUDE.md)
- [nestjs/CLAUDE.md](nestjs/CLAUDE.md)
