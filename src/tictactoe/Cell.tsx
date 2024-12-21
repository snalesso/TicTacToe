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
  config.isWinning && classes.push('winning');
  config.isLocked && classes.push('locked');
  const classesStr = classes.join(' ');
  return (
    <div className={classesStr} onClick={config.onClick}>
      {text}
    </div>
  );
}