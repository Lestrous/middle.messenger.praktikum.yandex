export function first(list: Array<unknown>): unknown | undefined {
  if (!Array.isArray(list)) {
    return undefined;
  }

  return list.length ? list[0] : undefined;
}
