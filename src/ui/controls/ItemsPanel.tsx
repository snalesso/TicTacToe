import { Orientation } from "../../tictactoe/Orientation";
import { IHaveChildren } from "../contracts/IHaveChildren";
import { IHaveClasses } from "../contracts/IHaveClassAttribute";
import { calcGapClasses, Gap, IHaveGap } from "../contracts/IHaveGap";
import { combClasses } from "./classes.utils";

export type ItemsPanelConfig =
  & IHaveChildren
  & IHaveClasses
  & IHaveGap
  & {
    readonly orientation?: Orientation;
    readonly isInline?: boolean;
    readonly isWrapping?: boolean;
  }

export default function ItemsPanel(cfg: ItemsPanelConfig) {
  const isInline = cfg.isInline ?? false;
  const orientation = cfg.orientation ?? Orientation.Horizontal;
  const isWrapping = cfg.isWrapping ?? false;
  const gapClasses = calcGapClasses(cfg.gap ?? Gap.SM);
  const className = combClasses([
    isInline ? 'd-inline-flex' : 'd-flex',
    orientation === Orientation.Horizontal ? 'flex-row' : 'flex-col',
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
