import { SizeMag } from "../core/Size";

export type GapClass = `gap-${SizeMag}`
export type RowGapClass = `row-${GapClass}`
export type ColGapClass = `col-${GapClass}`

export const Gap: Readonly<Record<(keyof typeof SizeMag) | SizeMag, GapClass>> = {
  Zero: 'gap-0',
  [SizeMag.Zero]: 'gap-0',
  XS: 'gap-1',
  [SizeMag.XS]: 'gap-1',
  SM: 'gap-2',
  [SizeMag.SM]: 'gap-2',
  MD: 'gap-3',
  [SizeMag.MD]: 'gap-3',
  LG: 'gap-4',
  [SizeMag.LG]: 'gap-4',
  XL: 'gap-5',
  [SizeMag.XL]: 'gap-5',
} as const;

export type GapsProp = GapClass | SizeMag | {
  readonly row: GapClass | SizeMag;
  readonly col: GapClass | SizeMag;
} | {
  readonly row?: GapClass | SizeMag;
  readonly col: GapClass | SizeMag;
} | {
  readonly row: GapClass | SizeMag;
  readonly col?: GapClass | SizeMag;
}

export type IHaveGap = {
  readonly gap?: GapsProp;
}

export function calcGapClasses(gaps?: GapsProp): readonly (GapClass | RowGapClass | ColGapClass)[] {
  if (gaps == null)
    return [];
  if (typeof gaps !== 'object')
    return [calcGapClass(gaps)];
  const classes: (GapClass | RowGapClass | ColGapClass)[] = [];
  gaps.row && classes.push(`row-${calcGapClass(gaps.row)}`);
  gaps.col && classes.push(`col-${calcGapClass(gaps.col)}`);
  return classes;
}

export function calcGapClass(gap: GapClass | SizeMag): GapClass {
  if (typeof gap === 'string')
    return gap;
  if (typeof gap === 'number')
    return `gap-${gap}`;
  throw new Error(`Invalid gap value: ${gap}`);
}
