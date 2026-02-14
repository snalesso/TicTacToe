import { Orientation } from "../../t3/Orientation";
import { IHaveChildren } from "../contracts/IHaveChildren";
import { IHaveClassAttribute } from "../contracts/IHaveClassAttribute";
import { calcGapClasses, IHaveGap } from "../contracts/IHaveGap";
import { IHaveOrientation } from "../contracts/IHaveOrientation";
import { combClasses } from "./classes.utils";

export type ItemsPanelConfig =
  & IHaveChildren
  & IHaveClassAttribute
  & IHaveGap
  & IHaveOrientation
  & {
    readonly isInline?: boolean;
    readonly isWrapping?: boolean;
  }

export default function ItemsPanel(cfg: ItemsPanelConfig) {
  const isInline = cfg.isInline ?? false;
  const orientation = cfg.orientation ?? Orientation.Horizontal;
  const isWrapping = cfg.isWrapping ?? false;
  const gapClasses = calcGapClasses(cfg.gap);
  const className = combClasses([
    isInline ? 'd-inline-flex' : 'd-flex',
    orientation === Orientation.Horizontal ? 'flex-row' : 'flex-column',
    isWrapping ? 'flex-wrap' : undefined,
    ...gapClasses,
    cfg?.className,
  ]);
  return (
    <div className={className}>
      {cfg.children}
    </div>
  )
}
