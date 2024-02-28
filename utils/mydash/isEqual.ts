export const isEqual = (obj1: unknown, obj2: unknown): boolean => JSON.stringify(obj1) === JSON.stringify(obj2);
