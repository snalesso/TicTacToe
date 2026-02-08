import { Matrix2d } from "../math/Algebra";
import Col from "../ui/controls/Col";
import { BoardConfig } from "./Board";
import { DEFAULT_BOARD_SIZE, DEFAULT_WINNING_LINE_LENGTH } from "./Defaults";
import Match, { MatchPlayersConfig } from "./Match";
import { PlayerCode } from "./PlayerCode";
import WinningBoards from "./WinningBoards";

export default function TicTacToe() {
  const players: MatchPlayersConfig = {
    left: PlayerCode.CircleYellow,
    right: PlayerCode.CircleOrange,
  };
  const boardConfig: BoardConfig<PlayerCode | null> = {
    size: DEFAULT_BOARD_SIZE,
    matrix: new Matrix2d(DEFAULT_BOARD_SIZE.width, DEFAULT_BOARD_SIZE.height, () => null),
  };
  return (
    <Col className='ai-c gap-3'>
      <Match
        players={players}
        board={boardConfig}
        winningLineLength={DEFAULT_WINNING_LINE_LENGTH}
      />
      <WinningBoards
        size={DEFAULT_BOARD_SIZE}
        length={DEFAULT_WINNING_LINE_LENGTH}
      />
    </Col>
  );
}