import { isArray, isArrayOrObject, isPlainObject, PlainObject } from '../typesHelpers';

export function cloneDeep<T extends object = object>(obj: T): T {
  if (isArray(obj)) {
    const cloneArr = [];

    for (let item of [...obj]) {
      if (isArrayOrObject(item)) {
        cloneArr.push(cloneDeep(item));
      } else {
        cloneArr.push(item);
      }
    }

    return cloneArr as T;
  } else if (isPlainObject(obj)) {
    const cloneObj: PlainObject = {};

    for (let [key, item] of Object.entries({...obj})) {
      if (isArrayOrObject(item)) {
        cloneObj[key] = cloneDeep(item);
      } else {
        cloneObj[key] = item;
      }
    }

    return cloneObj as T;
  }

  return obj;
}
