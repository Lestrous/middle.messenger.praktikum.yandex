export function range(start: number, end: number, step: number, isRight: boolean = false): number[] {
  if (end === undefined) {
    [start, end] = [0, start || 0];
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;

  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  let index = 0;

  const result = new Array(length);

  while (length--) {
    result[isRight ? length : index++] = start;
    start += step;
  }

  return result;
}
