export enum SizeMag {
  Zero = 0,
  XS = 1,
  SM = 2,
  MD = 3,
  LG = 4,
  XL = 5,
}

export enum SizeCode {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export function SizeCodeFromMag(mag: SizeMag): SizeCode {
  switch (mag) {
    case SizeMag.XS: return SizeCode.XS;
    case SizeMag.SM: return SizeCode.SM;
    case SizeMag.MD: return SizeCode.MD;
    case SizeMag.LG: return SizeCode.LG;
    case SizeMag.XL: return SizeCode.XL;
    default: throw new Error(`No corresponding SizeCode for SizeMag: ${mag}.`);
  }
}

export function sizeMagFromCode(mag: SizeCode): SizeMag {
  switch (mag) {
    case SizeCode.XS: return SizeMag.XS;
    case SizeCode.SM: return SizeMag.SM;
    case SizeCode.MD: return SizeMag.MD;
    case SizeCode.LG: return SizeMag.LG;
    case SizeCode.XL: return SizeMag.XL;
    default: throw new Error(`No corresponding SizeCode for SizeMag: ${mag}.`);
  }
}