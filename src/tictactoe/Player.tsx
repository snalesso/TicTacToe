import './Player.scss';
import { PlayerCode } from "./PlayerCode";

export type PlayerConfig = {
  readonly code: PlayerCode;
  readonly isActive: boolean;
};

export default function Player(config: PlayerConfig) {
  const classes: string[] = ['player'];
  config.isActive && classes.push('active');
  return (
    <div className={classes.join(' ')}>
      <label>{config.code}</label>
    </div>
  );
}