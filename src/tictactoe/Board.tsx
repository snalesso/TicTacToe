import { Matrix2d } from "../core/Algebra";
import { Coorsd2d, Line, Size } from "../core/Geometry";
import "./Board.scss";
import Cell from "./Cell";

export type BoardConfig<T> = {
  readonly size: Size;
  readonly neutralValues?: ReadonlySet<T>;
  readonly matrix: Matrix2d<T>;
  readonly winningLine?: Line | null;
  readonly onCellClicked?: (coords: Coorsd2d) => void;
}

export default function Board<T>(config: BoardConfig<T>) {

  const rows = config.matrix.getCols().map((row, x) => {
    const rowCells = row.map((value, y) => {
      const cellCoords = new Coorsd2d(x, y);
      const cellKey = cellCoords.toString();
      const isWinning = config.winningLine?.includes(cellCoords) ?? false;
      const isLocked = config.onCellClicked == null
        || !(config.neutralValues?.has(value) ?? false)
        || config.winningLine != null;
      const handleCellClick = () => {
        config.onCellClicked?.(cellCoords);
      };
      return <Cell
        key={cellKey}
        value={value}
        isWinning={isWinning}
        isLocked={isLocked}
        onClick={handleCellClick}
      />;
    });
    return (
      <div key={x} className='row'>
        {rowCells}
      </div>
    );
  });

  return (
    <div className='col board'>
      {rows}
    </div>
  );
}