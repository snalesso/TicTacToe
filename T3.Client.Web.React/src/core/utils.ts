export function calcActiveFields(map: Record<string, boolean>): readonly string[] {
  return Object.entries(map).filter(([_, v]) => v).map(([k, _]) => k);
}

export function inlineThrow<TError extends Error>(createError: () => TError): never {
  throw createError();
}