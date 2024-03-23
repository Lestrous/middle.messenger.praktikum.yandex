import { isArray, isPlainObject, PlainObject } from '../typesHelpers';

export function isEqual(lhs: object, rhs: object) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = (rhs as PlainObject)[key];

    if (typeof value === 'function' && typeof rightValue === 'function') {
      if (value.toString() === rightValue.toString()) {
        continue;
      }

      return false;
    } else if (isArray(value) && isArray(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }

      return false;
    } else if (isPlainObject(value) && isPlainObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }

      return false;
    }

    if (Number.isNaN(value)) {
      return Number.isNaN(rightValue);
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
