export function combClasses(classes: ArrayLike<string | undefined>): string {
  let o = '';
  for (let i = 0; i < classes.length; i++) {
    const s = classes[i];
    if (s == null || s.length === 0)
      continue;
    if (i > 0 && o.length > 0)
      o += ' ';
    o += s;
  }
  return o;
}