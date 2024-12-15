import { useEffect, useState } from "react";
import { createMatrix, Line, Rectangle, Square, Vector2D } from "../core/Geometry";
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

export default function Board<T>(config: IBoardConfig<T>) {

  const [currPlayerCode, setcurrPlayerCode] = config.players == null ? [null, () => { }] : useState(config.players?.initial);
  const [winningLine, setWinningLine] = useState<Line | null>(null);
  const [isMatchFinished, setIsMatchFinished] = useState(config.players == null);
  useEffect(() => {
    setIsMatchFinished(winningLine != null)
  }, [winningLine]);
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
      setWinningLine(winningLine);
      // setIsMatchFinished(true);
      break;
    }
    if (isMatchFinished)
      return;

    setcurrPlayerCode(config.players.advance());
  }

  const rows = cells.map((colCells, x) => {
    const rowCells = colCells.map((rowCell, y) => {
      const cellCoords = new Vector2D(x, y);
      const [isWinning, setIsWinning] = useState(winningLine?.includes(cellCoords) ?? false);
      useEffect(() => {
        const iw = winningLine?.includes(cellCoords) ?? false;
        setIsWinning(iw);
      }, [winningLine, cells]);
      return <Cell key={cellCoords.toString()}
        value={rowCell}
        onClick={() => handleSquareClick(cellCoords)}
        size={config.cellSize}
        isWinning={isWinning}
        isLocked={winningLine != null}
      />;
    });
    return <div key={x} className="row">{rowCells}</div>;
  });

  return (
    <div className="col board">
      {rows}
    </div>
  )
}