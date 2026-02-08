import { useMemo, useReducer, useState } from "react";
import { useUpdateEffect } from "react-use";
import { Matrix2d } from "../core/Algebra";
import { Coorsd2d } from "../core/Geometry";
import ItemsPanel from "../ui/controls/ItemsPanel";
import Board, { BoardAction, BoardActionCode, BoardConfig } from "./Board";
import './Match.scss';
import Player from "./Player";
import { PlayerCode } from "./PlayerCode";
import { calcWinningLines } from "./utils";

export type MatchCellValue = PlayerCode | null;

export type MatchPlayersConfig = {
  readonly left: PlayerCode;
  readonly right: PlayerCode;
}
export type MatchBoardConfig = Readonly<Pick<BoardConfig<MatchCellValue>, 'size'>>;

export type MatchConfig = {
  readonly board: MatchBoardConfig;
  readonly players: MatchPlayersConfig;
  readonly winningLineLength: number;
}

export default function Match(config: MatchConfig) {
  const neutralValues: ReadonlySet<MatchCellValue> = new Set<MatchCellValue>([null]);
  const initialMatrix = new Matrix2d<MatchCellValue>(config.board.size.width, config.board.size.height, () => null);
  const [currPlayerCode, setcurrPlayerCode] = useState<MatchCellValue>(config.players.left);
  const [matrix, updateMatrix] = useReducer((prev: Matrix2d<MatchCellValue>, action: BoardAction<MatchCellValue>) => {
    return prev.with(action.params.coords.x, action.params.coords.y, currPlayerCode);
  }, initialMatrix);
  const winningLines = useMemo(
    () => {
      return calcWinningLines(config.board.size, config.winningLineLength);
    },
    [config.board.size, config.winningLineLength]);
  const calcWinningLine = (matrix: Matrix2d<MatchCellValue>) => {
    for (const line of winningLines) {
      const [firstLinePoint, ...points] = line.points;
      const firstLineValue = matrix.getValue(firstLinePoint.x, firstLinePoint.y);
      if (firstLineValue !== config.players.left && firstLineValue !== config.players.right)
        continue;
      if (points.some(p => matrix.getValue(p.x, p.y) !== firstLineValue))
        continue;
      return line;
    }
    return null;
  };
  const winningLine = calcWinningLine(matrix);
  const calcNextPlayerCode = () => {
    if (winningLine == null)
      return currPlayerCode === config.players.left ? config.players.right : config.players.left;
    return currPlayerCode;
  };
  useUpdateEffect(
    () => {
      setcurrPlayerCode(calcNextPlayerCode());
    },
    [matrix]);
  const handleBoardCellValuesChange = (coords: Coorsd2d, value: MatchCellValue) => {
    if (!neutralValues.has(value)
      || winningLine != null)
      return;
    updateMatrix({ code: BoardActionCode.SetValue, params: { coords, value } });
  };

  return (
    <ItemsPanel className='match'>
      <Player
        code={config.players.left}
        isActive={currPlayerCode === config.players.left}
        isWinner={winningLine != null && currPlayerCode === config.players.left}
      />
      <Board
        size={config.board.size}
        neutralValues={neutralValues}
        matrix={matrix}
        winningLine={winningLine}
        onCellClicked={handleBoardCellValuesChange}
      />
      <Player
        code={config.players.right}
        isActive={currPlayerCode === config.players.right}
        isWinner={winningLine != null && currPlayerCode === config.players.right}
      />
    </ItemsPanel>
  );
}