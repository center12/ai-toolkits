// Template: Module helpers
// Location: src/modules/<module-name>/helpers/<module-name>.helpers.ts
// Rules: pure functions only — no NestJS decorators, no Prisma, no side effects

/**
 * Example helper: transform or format module data.
 * Replace with your actual helper logic.
 */
export function formatModuleNameItem(item: { id: string; name: string }): string {
  return `${item.id}: ${item.name}` // TODO: implement
}
