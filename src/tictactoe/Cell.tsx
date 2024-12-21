import { condPush } from '../core/Array.utils';
import './Cell.scss';

export type BoardCellConfig<T> = {
  readonly value: T;
  readonly onClick?: () => void;
  readonly isWinning: boolean;
  readonly isLocked: boolean;
}

export default function Cell<T>(config: BoardCellConfig<T>) {
  const text = config.value === null
    ? ''
    : typeof config.value === 'string' || config.value instanceof String
      ? config.value
      : JSON.stringify(config.value);
  const classes: string[] = ['cell'];
  condPush(classes, config.isWinning, 'winning');
  condPush(classes, config.isLocked, 'locked');
  const classesStr = classes.join(' ');
  return (
    <div className={classesStr} onClick={config.onClick}>
      {text}
    </div>
  );
}