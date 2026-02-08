import './Player.scss';
import { PlayerCode } from "./PlayerCode";

export type PlayerConfig = {
  readonly code: PlayerCode;
  readonly isActive: boolean;
  readonly isWinner: boolean;
};

export default function Player(config: PlayerConfig) {
  const classes: string[] = ['player'];
  config.isActive && classes.push('active');
  config.isWinner && classes.push('winner');
  return (
    <div className={classes.join(' ')}>
      <label>{config.code}</label>
    </div>
  );
}