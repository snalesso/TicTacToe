import { useReducer, useState } from "react";
import { useUpdateEffect } from "react-use";
import { Matrix2d } from "../core/Algebra";
import { Coorsd2d } from "../core/Geometry";
import Board, { BoardConfig } from "./Board";
import './Match.scss';
import Player from "./Player";
import { PlayerCode } from "./PlayerCode";
import { calcWinningLines } from "./utils";

export type MatchCellValue = PlayerCode | null;

export type MatchPlayersConfig = {
  // readonly all: readonly T[];
  readonly left: PlayerCode;
  readonly right: PlayerCode;
  // readonly advance: () => T;
  // readonly getCurr: () => T;
}
export type MatchBoardConfig = Readonly<Pick<BoardConfig<MatchCellValue>, 'size'>>;

export type MatchConfig = {
  readonly board: MatchBoardConfig;
  readonly players: MatchPlayersConfig;
  readonly winningLineLength: number;
}

export default function Match(config: MatchConfig) {

  const initialMatrix = new Matrix2d<MatchCellValue>(config.board.size.width, config.board.size.height, () => null);
  const [matrix, setMatrix] = useState(initialMatrix);
  const winningLines = calcWinningLines(config.board.size, config.winningLineLength);
  const calcWinningLine = (cells: Matrix2d<MatchCellValue>) => {
    for (const line of winningLines) {
      const [firstLinePoint, ...points] = line.points;
      const firstLineValue = cells.getValue(firstLinePoint.x, firstLinePoint.y);
      if (firstLineValue !== config.players.left && firstLineValue !== config.players.right)
        continue;
      if (points.some(p => cells.getValue(p.x, p.y) !== firstLineValue))
        continue;
      return line;
    }
    return null;
  };
  const [winningLine, updateWinningLine] = useReducer(_ => calcWinningLine(matrix), null);
  useUpdateEffect(
    () => {
      updateWinningLine();
    },
    [matrix]);
  useUpdateEffect(
    () => {
      setcurrPlayerCode(winningLine != null ? null : calcNextPlayerCode());
    },
    [matrix, winningLine]);
  const [currPlayerCode, setcurrPlayerCode] = useState<MatchCellValue>(config.players.left);
  const calcNextPlayerCode = () => {
    return currPlayerCode === config.players.left ? config.players.right : config.players.left;
  };
  const handleBoardCellValuesChange = (coords: Coorsd2d) => {
    if (winningLine != null)
      return;
    const newCells = matrix.with(coords.x, coords.y, currPlayerCode);
    setMatrix(newCells);;
  };

  return (
    <div className='match'>
      <Player
        code={config.players.left}
        isActive={currPlayerCode === config.players.left}
      />
      <Board
        size={config.board.size}
        neutralValues={new Set<MatchCellValue>([null])}
        matrix={matrix}
        winningLine={winningLine}
        onCellClicked={handleBoardCellValuesChange}
      />
      <Player
        code={config.players.right}
        isActive={currPlayerCode === config.players.right}
      />
    </div>
  );
}