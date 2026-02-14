import { Matrix2d } from "../math/Algebra";
import { Size } from "../math/Geometry";
import Col from "../ui/controls/Col";
import Row from "../ui/controls/Row";
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
      <Col key={`board-container-${i}`}>
        <Board
          key={`board-${i}`}
          size={config.size}
          matrix={matrix}
        />
      </Col>
    );
  });

  return (
    <Row className='jc-c'>
      {boards}
    </Row>
  );
}