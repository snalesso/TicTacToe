import { IHaveChildren } from "../contracts/IHaveChildren";
import { IHaveClassAttribute } from "../contracts/IHaveClassAttribute";
import { combClasses } from "./classes.utils";

export type IRowConfig =
  IHaveChildren
  & IHaveClassAttribute
  & {}

export default function Row(cfg?: IRowConfig) {
  const classes = combClasses(['row', cfg?.className]);
  return (
    <div className={classes}>
      {cfg?.children}
    </div>
  )
}