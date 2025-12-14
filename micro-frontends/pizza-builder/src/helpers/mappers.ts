export function mapWithCount<T extends object>(
  items: T[],
): (T & { count: number })[] {
  return items.map((item) => ({
    ...item,
    count: 0,
  }));
}
