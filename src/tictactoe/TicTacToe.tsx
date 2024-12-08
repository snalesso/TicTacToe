import { Square } from "../core/Geometry";
import Board, { IBoardPlayers } from "./Board";
import { PlayerCode } from "./PlayerCode";
import WinningBoards from "./WinningBoards";

export const DEFAULT_BOARD_SIDE_LENGTH = 3;
export const DEFAULT_BOARD_SIZE = new Square(DEFAULT_BOARD_SIDE_LENGTH);
export const DEFAULT_WINNING_LINE_LENGTH = DEFAULT_BOARD_SIDE_LENGTH;

export default function TicTacToe() {
  const playerCodeSeq = [PlayerCode.CircleYellow, PlayerCode.CircleBlue];
  let currPlayerCode = playerCodeSeq[0];
  const players: IBoardPlayers<PlayerCode> = {
    initial: currPlayerCode,
    getCurr: () => currPlayerCode,
    advance: () => {
      const idx = playerCodeSeq.indexOf(currPlayerCode);
      currPlayerCode = playerCodeSeq[(idx + 1) % playerCodeSeq.length];
      return currPlayerCode;
    },
  }
  return (
    <div className="col gap-3">
      <Board size={DEFAULT_BOARD_SIZE} players={players} winningLineLength={DEFAULT_WINNING_LINE_LENGTH} />
      <WinningBoards size={DEFAULT_BOARD_SIZE} length={DEFAULT_WINNING_LINE_LENGTH}></WinningBoards>
    </div>
  )
}