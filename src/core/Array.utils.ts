export function condPush<T>(array: T[], condition: boolean, value: T): T[] {
  if (condition)
    array.push(value);
  return array;
}