import { merge } from './merge';
import { PlainObject } from '../typesHelpers';

export function set(object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown {
  if (typeof object !== 'object') {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const newObj = path.split('.').reduceRight<PlainObject>((acc, path) => ({
    [path]: acc,
  }), value as any);

  return merge(object as PlainObject, newObj);
}
