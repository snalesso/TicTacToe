import { Matrix2d } from "../math/Algebra";
import { Coords2D, Line, Size } from "../math/Geometry";
import Col from "../ui/controls/Col";
import Row from "../ui/controls/Row";
import "./Board.scss";
import Cell from "./Cell";

export type BoardConfig<T> = {
  readonly size: Size;
  readonly neutralValues?: ReadonlySet<T>;
  readonly matrix: Matrix2d<T>;
  readonly winningLine?: Line | null;
  readonly onCellClicked?: (coords: Coords2D, value: T) => void;
}

export enum BoardActionCode {
  SetValue = 1,
  BoardReset,
}

export type BoardAction<T> = {
  readonly code: BoardActionCode.SetValue;
  readonly params: {
    readonly coords: Coords2D;
    readonly value: T;
  }
}

export default function Board<T>(config: BoardConfig<T>) {
  const rows = config.matrix.getCols().map((row, x) => {
    const rowCells = row.map((value, y) => {
      const cellCoords = new Coords2D(x, y);
      const cellKey = cellCoords.toString();
      const isWinning = config.winningLine?.includes(cellCoords) ?? false;
      const isLocked = config.onCellClicked == null
        || config.winningLine != null
        || !(config.neutralValues?.has(value) ?? false);
      const handleCellClick = () => {
        config.onCellClicked?.(cellCoords, value);
      };
      return (
        <Cell
          key={cellKey}
          value={value}
          isWinning={isWinning}
          isLocked={isLocked}
          onClick={handleCellClick}
        />
      );
    });
    return (
      <Row key={x} className='row'>
        {rowCells}
      </Row>
    );
  });
  return (
    <Col className='board'>
      {rows}
    </Col>
  );
}