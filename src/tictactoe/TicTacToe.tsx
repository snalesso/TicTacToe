import Board, { IBoardPlayers } from "./Board";
import { DEFAULT_BOARD_SIZE, DEFAULT_WINNING_LINE_LENGTH } from "./Configs";
import { PlayerCode } from "./PlayerCode";
import WinningBoards from "./WinningBoards";

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