# Claude Code Toolkit

A reusable collection of Claude Code skills, commands, and templates for fullstack projects (Vite/React + NestJS).

## Contents

### Skills (`skills/`)
Install to `~/.claude/skills/` to activate globally across all projects.

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `frontend-feature` | Creating components, pages, hooks, services, stores | Scan before creating; enforce feature folder structure |
| `backend-module` | Creating modules, services, controllers, DTOs, guards | Scan before creating; enforce NestJS module structure |

**Install:**
```bash
cp -r skills/frontend-feature ~/.claude/skills/
cp -r skills/backend-module ~/.claude/skills/
```

### Agents (`agents/`)
Copy to your project's `.claude/agents/` to enable as automatic subagents.

| Agent | Purpose | Auto-triggers when... |
|-------|---------|----------------------|
| `frontend-dev` | Frontend specialist — enforces structure, scans before creating | Creating components, pages, hooks, services, stores |
| `backend-dev` | Backend specialist — enforces NestJS structure, scans before creating | Creating modules, services, controllers, DTOs, guards |

**Install:**
```bash
mkdir -p .claude/agents
cp agents/*.md .claude/agents/
```

> Claude will automatically delegate to the matching agent based on the task. You can also invoke explicitly: *"Use the frontend-dev agent to add a user avatar component."*

### Commands (`commands/`)
Copy to your project's `.claude/commands/` to enable as slash commands.

| Command | Usage | Purpose |
|---------|-------|---------|
| `/extract-features` | `/extract-features [name]` | Extract frontend feature docs to `docs/features/` |
| `/extract-modules` | `/extract-modules [name]` | Extract backend module docs to `docs/modules/` |
| `/new-feature` | `/new-feature <name>` | Scaffold a new frontend feature folder structure |
| `/new-module` | `/new-module <name>` | Scaffold a new NestJS backend module with boilerplate |
| `/scan-reusables-frontend` | `/scan-reusables-frontend <task>` | Pre-task: scan frontend for reusable components, hooks, services |
| `/scan-reusables-backend` | `/scan-reusables-backend <task>` | Pre-task: scan backend for reusable services, guards, DTOs |
| `/check-conventions-frontend` | `/check-conventions-frontend [path]` | Post-task: validate frontend folder structure and naming |
| `/check-conventions-backend` | `/check-conventions-backend [path]` | Post-task: validate backend folder structure and naming |
| `/sync-docs` | `/sync-docs [--cron <interval>]` | Sync docs now or schedule automatic extraction |

**Install:**
```bash
mkdir -p .claude/commands
cp commands/*.md .claude/commands/
```

### Templates (`templates/`)
Reference templates used by commands and skills. Not meant to be used directly — they define the patterns commands scaffold from.

```
templates/
  frontend/    component, page, hook, store, helpers, constants, types
  backend/     module, controller, service, create.dto, update.dto, helpers, constants
```

---

## Frontend Folder Structure

```
src/
  features/
    <feature-name>/
      components/    # .tsx components scoped to this feature
      pages/         # page-level entry components
      services/      # API call functions
      hooks/         # React hooks
      utils/         # pure utility functions
      stores/        # Zustand stores
      types/         # TypeScript interfaces/types
      constants/     # constants
      helpers/       # helper functions
  components/        # global shared components
  services/          # global shared services
  hooks/             # global shared hooks
  utils/             # global shared utilities
  stores/            # global shared stores
```

**Scope rule**: one feature only → feature-scoped; two or more features → global.

## Backend Folder Structure (NestJS)

```
src/modules/<module-name>/
  dto/                           # create-*.dto.ts, update-*.dto.ts
  constants/                     # <domain>.constants.ts
  helpers/                       # <domain>.helpers.ts
  guards/                        # (optional) module-specific guards
  decorators/                    # (optional)
  <module-name>.controller.ts
  <module-name>.service.ts
  <module-name>.module.ts
```

**Naming**: kebab-case files (`dev-task.service.ts`), PascalCase classes (`DevTaskService`).
