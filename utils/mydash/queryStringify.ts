import { isArrayOrObject, isPlainObject, PlainObject } from '../typesHelpers';

type StringIndexed = Record<string, any>;

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function queryParams(data: [] | PlainObject, parentKey: string = ''): string {
  let str = '';

  for (let [key, item] of Object.entries(data)) {
    if (isArrayOrObject(item)) {
      str += queryParams(item, getKey(key, parentKey));
    } else {
      str += `&${getKey(key, parentKey)}=${encodeURIComponent(String(item))}`;
    }
  }

  return str;
}

export function queryStringify(data: StringIndexed): string | never {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return queryParams(data).slice(1);
}
