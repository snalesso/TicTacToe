import './App.scss';
import Header from './layout/Header';
import TicTacToe from './tictactoe/TicTacToe';
import Col from './ui/controls/Col';
import Row from './ui/controls/Row';

export default function App() {
  return (
    <Col className='ai-c gap-3'>
      <Row className='w-100'>
        <Header />
      </Row>
      <Row>
        <TicTacToe />
      </Row>
    </Col>
  );
}
