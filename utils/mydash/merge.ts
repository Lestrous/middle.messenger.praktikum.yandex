import { PlainObject } from '../typesHelpers';

export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  for (let key in rhs) {
    if (key in lhs && typeof rhs[key] === 'object') {
      lhs[key] = merge(lhs[key] as PlainObject, rhs[key] as PlainObject);
    } else {
      lhs[key] = rhs[key];
    }
  }

  return lhs;
}
