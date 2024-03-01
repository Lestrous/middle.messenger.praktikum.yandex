function getTag(value: unknown): string {
  if ([null, undefined].includes(value)) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }

  return Object.prototype.toString.call(value);
}

export function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  const tag = getTag(value);

  if (['[object Map]', '[object Set]'].includes(tag)) {
    return (value as Map<unknown, unknown> | Set<unknown>).size === 0;
  }

  switch (typeof value) {
    case 'number':
    case 'bigint':
    case 'symbol':
    case 'boolean': {
      return true;
    }
    case 'function':
    case 'object': {
      return Object.keys(value).length === 0;
    }
    default: {
      return true;
    }
  }
}
