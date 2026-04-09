# NestJS Backend Toolkit

Claude Code skills, agents, and commands for NestJS backend projects.

## Install

```bash
mkdir -p .claude/agents .claude/commands
cp nestjs/agents/*.md .claude/agents/
cp -r nestjs/skills/* ~/.claude/skills/
cp nestjs/commands/*.md .claude/commands/
```

## Contents

### Skills (`skills/`)
| Skill | Trigger | Purpose |
|-------|---------|---------|
| `backend-module` | Creating modules, services, controllers, DTOs, guards | Scan before creating; enforce NestJS module structure |

### Agents (`agents/`)
| Agent | Auto-triggers when... |
|-------|----------------------|
| `backend-dev` | Creating modules, services, controllers, DTOs, guards |

### Commands (`commands/`)
| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-module` | `/new-module <name>` | Scaffold a new NestJS module with boilerplate |
| `/extract-modules` | `/extract-modules [name]` | Extract module docs to `docs/modules/` |
| `/scan-reusables-backend` | `/scan-reusables-backend <task>` | Scan for reusable services, guards, DTOs |
| `/check-conventions-backend` | `/check-conventions-backend [path]` | Validate folder structure and naming |
| `/analyze-project` | `/analyze-project` | Full project structure analysis |
| `/cross-analysis` | `/cross-analysis` | Frontend ↔ backend cross-layer analysis |
| `/sync-docs` | `/sync-docs [--cron <interval>]` | Sync docs or schedule automatic extraction |
| `/final-report` | `/final-report` | Generate a final implementation report |
| `/review-pr` | `/review-pr base=<branch> head=<branch>` | Review code changes between two branches |

---

## Module Folder Structure

```
src/modules/<module-name>/
  dto/
    create-<module-name>.dto.ts
    update-<module-name>.dto.ts
  constants/
    <module-name>.constants.ts
  helpers/
    <module-name>.helpers.ts
  guards/              # optional, module-specific guards only
  decorators/          # optional
  <module-name>.controller.ts
  <module-name>.service.ts
  <module-name>.module.ts
```

---

## Naming Conventions

| File type | Convention | Example |
|-----------|-----------|---------|
| All files | kebab-case | `dev-task.service.ts` |
| Classes | PascalCase | `DevTaskService` |
| Controller | `<name>.controller.ts` | `dev-task.controller.ts` |
| Service | `<name>.service.ts` | `dev-task.service.ts` |
| Module | `<name>.module.ts` | `dev-task.module.ts` |
| Create DTO | `create-<name>.dto.ts` | `create-dev-task.dto.ts` |
| Update DTO | `update-<name>.dto.ts` | `update-dev-task.dto.ts` |
| Constants | `<name>.constants.ts` | `dev-task.constants.ts` |
| Helpers | `<name>.helpers.ts` | `dev-task.helpers.ts` |

**Never**: `UserService.ts`, `user_service.ts`, `constants.ts` at module root.

---

## Key Patterns

### Service
```ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ModuleNameService {
  private readonly logger = new Logger(ModuleNameService.name)
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    this.logger.debug(`findOne: id=${id}`)
    const item = await this.prisma.moduleName.findUnique({ where: { id } })
    if (!item) {
      this.logger.warn(`findOne: not found id=${id}`)
      throw new NotFoundException(`ModuleName ${id} not found`)
    }
    return item
  }
}
```

### DTOs
```ts
// create-<name>.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
export class CreateModuleNameDto {
  @IsString() @IsNotEmpty() name: string
  @IsString() @IsOptional() description?: string
}

// update-<name>.dto.ts
import { PartialType } from '@nestjs/mapped-types'
import { CreateModuleNameDto } from './create-module-name.dto'
export class UpdateModuleNameDto extends PartialType(CreateModuleNameDto) {}
```

### Auth Conventions
- `JwtAuthGuard` is applied globally — all endpoints protected by default
- Use `@Public()` decorator to expose an endpoint without auth
- Use `SseJwtAuthGuard` for Server-Sent Events endpoints

### Logging Levels
- `logger.debug` — method entry with key params
- `logger.log` — successful mutations with result ID
- `logger.warn` — expected failures (not found, skipped)
- `logger.error` — caught exceptions with stack trace
- Controllers do not log — delegate to services
- Never use `console.log`; never log sensitive data

### Module Registration
After creating a new module:
1. Add `PrismaService` to `providers` in the module file
2. Import `AuthModule` if the module needs auth
3. Register the new module in `app.module.ts`

### Well-Known Shared Providers (scan before creating)
- `PrismaService` — database access, never create a new DB client
- `JwtAuthGuard` — global auth guard
- `@Public()` — opt out of auth
- `SseJwtAuthGuard` — for SSE endpoints
- `IStorageProvider` — file storage abstraction
- `AIProviderFactory` — AI provider abstraction
