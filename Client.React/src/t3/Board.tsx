import { Matrix2d } from "../math/Algebra";
import { Coords2D, Line, Size } from "../math/Geometry";
import ItemsPanel from "../ui/controls/ItemsPanel";
import "./Board.scss";
import Cell from "./Cell";
import { Orientation } from "./Orientation";

export type BoardConfig<T> = {
  readonly size: Size;
  readonly neutralValues?: ReadonlySet<T>;
  readonly matrix: Matrix2d<T>;
  readonly winningLine?: Line | null;
  readonly onCellClicked?: (coords: Coords2D, value: T) => void;
}

export enum BoardActionCode {
  SetCellValue = 1,
  Reset = 2,
}

export type BoardAction<T> = {
  readonly code: BoardActionCode.SetCellValue;
  readonly params: {
    readonly coords: Coords2D;
    readonly value: T;
  }
} | {
  readonly code: BoardActionCode.Reset;
}

export default function Board<T>(config: BoardConfig<T>) {
  const rows = config.matrix.getCols().map((row, rowIndex) => {
    const cells = row.map((cellValue, cellIndex) => {
      const cellCoords = new Coords2D(rowIndex, cellIndex);
      const cellKey = cellCoords.toString();
      const isWinning = config.winningLine?.includes(cellCoords) ?? false;
      const isLocked = config.onCellClicked == null
        || config.winningLine != null
        || !(config.neutralValues?.has(cellValue) ?? false);
      const handleCellClick = () => {
        config.onCellClicked?.(cellCoords, cellValue);
      };
      return (
        <Cell
          key={cellKey}
          value={cellValue}
          isWinning={isWinning}
          isLocked={isLocked}
          onClick={handleCellClick}
        />
      );
    });
    return (
      <ItemsPanel key={rowIndex} orientation={Orientation.Horizontal}>
        {cells}
      </ItemsPanel>
    );
  });
  return (
    <ItemsPanel orientation={Orientation.Vertical}>
      {rows}
    </ItemsPanel>
  );
}