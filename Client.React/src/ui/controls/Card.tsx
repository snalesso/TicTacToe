import { PropsWithChildren } from 'react';
import { IHaveBackground } from '../contracts/IHaveBackground';
import { IHaveBorder } from '../contracts/IHaveBorder';
import { IHaveClassAttribute } from '../contracts/IHaveClassAttribute';
import { calcGapClasses, IHaveGap } from '../contracts/IHaveGap';
import { IHaveOrientation } from '../contracts/IHaveOrientation';
import { calcPaddingClasses, IHavePadding, PaddingClass } from '../contracts/IHavePadding';
import { SizeMag } from '../core/Size';
import { BackgroundColorCode } from '../themes/bs/BackgroundColorCode';
import { BorderColorCode } from '../themes/bs/BorderColorCode';
import { combClasses } from './classes.utils';
import ItemsPanel, { ItemsPanelConfig } from './ItemsPanel';

export type CardConfig =
  & ItemsPanelConfig
  & IHaveClassAttribute
  & IHaveBorder
  & IHaveBackground
  & IHaveOrientation
  & IHavePadding
  & IHaveGap
  & Readonly<Required<PropsWithChildren<{}>>>

export default function Card(cfg: CardConfig) {
  const backgroundColorCode = cfg.backgroundColorCode ?? BackgroundColorCode.body_secondary;
  const borderColorCode = cfg.borderColorCode ?? BorderColorCode.black;
  const backgroundClass = `bg-${backgroundColorCode}`;
  const borderClasses = cfg.borderColorCode ? ['border', `border-${borderColorCode}`, 'rounded'] : [];
  const className = combClasses([
    backgroundClass,
    ...borderClasses,
    ...calcGapClasses(cfg.gap ?? SizeMag.SM),
    ...calcPaddingClasses(cfg.padding ?? PaddingClass.SM),
    cfg.className,
  ]);
  return (
    <ItemsPanel {...{ ...cfg, className: className }}>
      {cfg.children}
    </ItemsPanel>
  )
}
