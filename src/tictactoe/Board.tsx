import { useState } from "react";
import { Rectangle, Square, Vector2D } from "../core/Geometry";
import "./Board.css";
import Cell from "./Cell";
import { calcWinningCols, calcWinningDiagonals, calcWinningRows, get2dCell, get2dCells } from "./utils";

export interface IBoardPlayers<T> {
  readonly initial: T;
  readonly advance: () => T;
  readonly getCurr: () => T;
}

export interface IBoardConfig<T> {
  readonly size: Rectangle;
  readonly cellSize?: Square;
  readonly cells?: readonly (readonly T[])[];
  readonly players?: IBoardPlayers<T>;
  readonly winningLineLength: number;
}

export function createMatrix<T>(size: Rectangle, cellInit: (coord: Vector2D) => T): (readonly (readonly T[])[]) {
  const cells = Array(size.width).fill(undefined).map((_, x) => {
    const rows = Array(size.height).fill(undefined).map((_, y) => {
      const cell = cellInit(new Vector2D(x, y));
      return cell;
    });
    return rows;
  });
  return cells;
}

export default function Board<T>(config: IBoardConfig<T>) {

  const [currPlayerCode, setcurrPlayerCode] = config.players == null ? [null, () => { }] : useState(config.players?.initial);
  const [isMatchFinished, setIsMatchFinished] = useState(config.players == null);
  const initialBoardCells = createMatrix(
    config.size,
    coord => config.cells == null ? null : get2dCell(config.cells, coord));
  const [cells, setCells] = useState(initialBoardCells);
  const winningLines = [
    ...calcWinningCols(config.size, config.winningLineLength),
    ...calcWinningRows(config.size, config.winningLineLength),
    ...calcWinningDiagonals(config.size, config.winningLineLength)
  ];

  function handleSquareClick(coord: Vector2D) {
    if (config.players == null || isMatchFinished)
      return;
    if (get2dCell(cells, coord) != null)
      return;
    const newCells = createMatrix(config.size, c => {
      if (c.equals(coord))
        return currPlayerCode;
      return get2dCell(cells, c);
    })
    setCells(newCells);
    for (const winningLine of winningLines) {
      const values = new Set(get2dCells(newCells, winningLine));
      if (values.size !== 1 || values.has(null))
        continue;
      setIsMatchFinished(true);
      break;
    }
    if (isMatchFinished)
      return;

    setcurrPlayerCode(config.players.advance());
  }

  const rows = cells.map((colCells, x) => {
    const rowCells = colCells.map((rowCell, y) => {
      const cellCoords = new Vector2D(x, y);
      return <Cell key={cellCoords.toString()} value={rowCell} onClick={() => handleSquareClick(cellCoords)} size={config.cellSize} />;
    });
    return <div key={x} className="row">{rowCells}</div>;
  });

  return (
    <div className="col">
      {rows}
    </div>
  );
}

