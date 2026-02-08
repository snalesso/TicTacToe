import TicTacToe from '../t3/TicTacToe';
import Col from '../ui/controls/Col';
import Row from '../ui/controls/Row';
import './App.scss';
import Header from './Header';

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
