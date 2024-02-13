import { range } from './range';

export function rangeRight(start, end, step) {
  return range(start, end, step, true);
}
