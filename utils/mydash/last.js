export function last(list) {
  if (!Array.isArray(list)) {
    return undefined;
  }

  return list.length ? list.at(-1) : undefined;
}
