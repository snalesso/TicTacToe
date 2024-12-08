import { Square } from '../core/Geometry';
import './Cell.css';

export const DEFAULT_CELL_SIDE_LENGTH = 48;
export const DEFAULT_CELL_SIZE = new Square(DEFAULT_CELL_SIDE_LENGTH);

export interface IBoardCell<T> {
  readonly value: T;
  readonly onClick: () => void;
  readonly size?: Square;
}

export default function Cell<T>(config: IBoardCell<T>) {
  const style = {
    width: config.size?.width ?? DEFAULT_CELL_SIDE_LENGTH,
    height: config.size?.height ?? DEFAULT_CELL_SIDE_LENGTH,
  };
  const text = config.value === null
    ? ""
    : typeof config.value === 'string' || config.value instanceof String
      ? config.value
      : JSON.stringify(config.value);
  return <button className="cell" onClick={config.onClick} style={style}>
    {text}
  </button>
}