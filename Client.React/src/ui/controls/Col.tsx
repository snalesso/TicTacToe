import { IHaveChildren } from "../contracts/IHaveChildren";
import { IHaveClassAttribute } from "../contracts/IHaveClassAttribute";
import { combClasses } from "./classes.utils";

export type IColConfig =
  & IHaveChildren
  & IHaveClassAttribute
  & {}

export default function Col(cfg?: IColConfig) {
  const classes = combClasses(['col', cfg?.className]);
  return (
    <div className={classes}>
      {cfg?.children}
    </div>
  )
}