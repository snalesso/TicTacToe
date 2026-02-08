import { SizeMag } from "../core/Size";

export type Gap = `gap-${SizeMag}`;
export const Gap: Readonly<Record<(keyof typeof SizeMag) | SizeMag, Gap>> = {
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

export type RowGap = `row-${Gap}`
export type ColGap = `col-${Gap}`

export type GapProp = Gap /* | SizeMag */ | {
  readonly row: RowGap /*| SizeMag*/;
  readonly col: ColGap /*| SizeMag*/;
} | {
  readonly row?: RowGap /*| SizeMag*/;
  readonly col: ColGap /*| SizeMag*/;
} | {
  readonly row: RowGap /*| SizeMag*/;
  readonly col?: ColGap /*| SizeMag*/;
}

export type IHaveGap = {
  readonly gap?: GapProp;
}

export function calcGapClasses(gap?: GapProp): readonly (Gap | RowGap | ColGap)[] {
  if (gap == null)
    return [];
  // if (typeof gap === 'number')
  //   return [`gap-${gap}`];
  if (typeof gap === 'string')
    return [gap];
  const classes: (Gap | RowGap | ColGap)[] = [];
  gap.row && classes.push(gap.row);
  gap.col && classes.push(gap.col);
  return classes;
}
