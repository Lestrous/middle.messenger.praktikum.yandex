function getTag(value) {
  if ([null, undefined].includes(value)) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }

  return toString.call(value);
}

export function isEmpty(value) {
  if (!value) {
    return true;
  }

  const tag = getTag(value);

  if (['[object Map]', '[object Set]'].includes(tag)) {
    return value.size === 0;
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
