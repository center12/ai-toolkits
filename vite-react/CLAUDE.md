# Vite/React Frontend Toolkit

Claude Code skills, agents, and commands for Vite/React frontend projects.

## Install

```bash
mkdir -p .claude/agents .claude/commands
cp vite-react/agents/*.md .claude/agents/
cp -r vite-react/skills/* ~/.claude/skills/
cp vite-react/commands/*.md .claude/commands/
```

## Contents

### Skills (`skills/`)
| Skill | Trigger | Purpose |
|-------|---------|---------|
| `frontend-feature` | Creating components, pages, hooks, services, stores | Scan before creating; enforce feature folder structure |

### Agents (`agents/`)
| Agent | Auto-triggers when... |
|-------|----------------------|
| `frontend-dev` | Creating components, pages, hooks, services, stores |

### Commands (`commands/`)
| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-feature` | `/new-feature <name>` | Scaffold a new feature folder structure |
| `/extract-features` | `/extract-features [name]` | Extract feature docs to `docs/features/` |
| `/scan-reusables-frontend` | `/scan-reusables-frontend <task>` | Scan for reusable components, hooks, services |
| `/check-conventions-frontend` | `/check-conventions-frontend [path]` | Validate folder structure and naming |
| `/analyze-feature` | `/analyze-feature <name>` | Deep-dive analysis of a specific feature |
| `/analyze-project` | `/analyze-project` | Full project structure analysis |
| `/cross-analysis` | `/cross-analysis` | Frontend ↔ backend cross-layer analysis |
| `/sync-docs` | `/sync-docs [--cron <interval>]` | Sync docs or schedule automatic extraction |
| `/final-report` | `/final-report` | Generate a final implementation report |

---

## Folder Structure

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

---

## Naming Conventions

| File type | Convention | Example |
|-----------|-----------|---------|
| Component | `PascalCase.tsx` | `UserCard.tsx` |
| Page | `PascalCasePage.tsx` | `UserListPage.tsx` |
| Hook | `use-domain.hook.ts` | `use-user.hook.ts` |
| Service | `domain.service.ts` | `user.service.ts` |
| Store | `domain.store.ts` | `user.store.ts` |
| Types | `domain.types.ts` | `user.types.ts` |
| Constants | `domain.constants.ts` | `user.constants.ts` |
| Helpers | `domain.helpers.ts` | `user.helpers.ts` |

---

## Key Patterns

### Hook (TanStack Query)
```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/domain.constants'
import { domainService } from '../services/domain.service'

export function useDomain() {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: QUERY_KEYS.list(), queryFn: domainService.getAll })
  const mutation = useMutation({
    mutationFn: domainService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all })
  })
  return { ...query, create: mutation.mutate }
}
```

### Store (Zustand)
```ts
import { create } from 'zustand'
interface DomainState { items: Item[]; setItems: (items: Item[]) => void; reset: () => void }
const initialState = { items: [] }
export const useDomainStore = create<DomainState>((set) => ({
  ...initialState,
  setItems: (items) => set({ items }),
  reset: () => set(initialState),
}))
```

### Logging
```ts
// Service
console.debug('[user.service] getUsers: fetching')
console.error('[user.service] getUsers: failed', err)
```
- Use `console.debug` for normal flow, `console.error` for failures
- Prefix: `[<feature>.<type>] <method>: <event>`
- Never log sensitive data (tokens, passwords, PII)
