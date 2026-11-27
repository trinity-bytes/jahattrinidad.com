/** The item after `id` in list order, wrapping from the last to the first; undefined without another item. */
export function nextInCycle<T extends { id: string }>(items: readonly T[], id: string): T | undefined {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1 || items.length < 2) return undefined;
  return items[(index + 1) % items.length];
}
