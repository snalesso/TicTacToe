import { IHaveChildren } from "../contracts/IHaveChildren";
import { IHaveClasses } from "../contracts/IHaveClassAttribute";
import { combClasses } from "./classes.utils";

export type IColConfig =
  & IHaveChildren
  & IHaveClasses
  & {}

export default function Col(cfg?: IColConfig) {
  const classes = combClasses(['d-flex', 'flex-col', cfg?.className]);
  return (
    <div className={classes}>
      {cfg?.children}
    </div>
  )
}