import { Matrix2d } from "../core/Algebra";
import { Size } from "../core/Geometry";
import Board from "./Board";
import { PlayerCode } from "./PlayerCode";
import { calcWinningLines } from "./utils";

export default function WinningBoards(config: { readonly size: Size; readonly length: number }) {
  const winningLines = calcWinningLines(config.size, config.length);
  const boards = winningLines.map((line, i) => {
    const matrix = new Matrix2d(config.size.width, config.size.height, (x, y) => {
      if (line.includes(x, y))
        return PlayerCode.Tick;
      return null;
    });
    return (
      <div key={`board-container-${i}`} className='col'>
        <Board
          key={`board-${i}`}
          size={config.size}
          matrix={matrix}
        />
      </div>
    );
  });

  return (
    <div className='row jc-c gap-3'>
      {boards}
    </div>
  );
}