export function last(list: Array<unknown>): unknown | undefined {
  if (!Array.isArray(list)) {
    return undefined;
  }

  return list.length ? list.at(-1) : undefined;
}
