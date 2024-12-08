import { Square } from "../core/Geometry";
import Board, { createMatrix } from "./Board";
import { PlayerCode } from "./PlayerCode";
import { DEFAULT_WINNING_LINE_LENGTH } from "./TicTacToe";
import { calcWinningCols, calcWinningDiagonals, calcWinningRows } from "./utils";

export default function WinningBoards(config: { readonly size: Square; readonly length: number }) {
  const winningLines = [
    ...calcWinningCols(config.size, config.length),
    ...calcWinningRows(config.size, config.length),
    ...calcWinningDiagonals(config.size, config.length)
  ];
  const boards = winningLines.map((line, i) => {
    const cells = createMatrix(config.size, coord => {
      if (line.some(p => p.equals(coord)))
        return PlayerCode.Tick;
      return null;
    });
    return (
      <div key={`board-container-${i}`} className="col">
        <Board key={`board-${i}`} size={config.size} cells={cells} winningLineLength={DEFAULT_WINNING_LINE_LENGTH} />
      </div>
    );
  });

  return (
    <>
      <div className="row d-flex-wrap gap-3">
        {boards}
      </div>
    </>
  );
}