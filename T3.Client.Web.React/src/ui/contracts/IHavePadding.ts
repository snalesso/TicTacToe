import { SizeMag } from "../core/Size";

export type PaddingClass = `p-${SizeMag}`;
export const PaddingClass: Readonly<Record<(keyof typeof SizeMag) | SizeMag, PaddingClass>> = {
  Zero: 'p-0',
  [SizeMag.Zero]: 'p-0',
  XS: 'p-1',
  [SizeMag.XS]: 'p-1',
  SM: 'p-2',
  [SizeMag.SM]: 'p-2',
  MD: 'p-3',
  [SizeMag.MD]: 'p-3',
  LG: 'p-4',
  [SizeMag.LG]: 'p-4',
  XL: 'p-5',
  [SizeMag.XL]: 'p-5',
} as const;

export type PaddingProp = PaddingClass

export type IHavePadding = {
  readonly padding?: PaddingProp;
}

export function calcPaddingClasses(padding?: PaddingProp): readonly PaddingClass[] {
  if (padding == null)
    return [];
  return [padding];
}