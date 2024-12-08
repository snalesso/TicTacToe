import { Square } from "../core/Geometry";
import Board, { createMatrix } from "./Board";
import { PlayerCode } from "./PlayerCode";
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
        <Board key={`board-${i}`} size={config.size} cells={cells} />
      </div>
    );
  });

  return (
    <>
      <div className="row gap-3">
        {boards}
      </div>
    </>
  );
}