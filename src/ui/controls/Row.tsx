import { IHaveChildren } from "../contracts/IHaveChildren";
import { IHaveClasses } from "../contracts/IHaveClassAttribute";
import { combClasses } from "./classes.utils";

export type IRowConfig =
  IHaveChildren
  & IHaveClasses
  & {}

export default function Row(cfg?: IRowConfig) {
  const classes = combClasses(['d-flex', 'flex-row', cfg?.className]);
  return (
    <div className={classes}>
      {cfg?.children}
    </div>
  )
}