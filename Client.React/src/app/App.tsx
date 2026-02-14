import TicTacToe from '../t3/TicTacToe';
import Col from '../ui/controls/Col';
import Row from '../ui/controls/Row';
import './App.scss';
import Header from './Header';

export default function App() {
  return (
    <div className='container-fluid ai-c gap-3'>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col className='pt-3'>
          <TicTacToe />
        </Col>
      </Row>
    </div>
  );
}
