import './App.scss';
import Header from './layout/Header';
import TicTacToe from './tictactoe/TicTacToe';

export default function App() {
  return (
    <div className='col gap-3'>
      <div className='row w-100'>
        <Header />
      </div>
      <div className='row'>
        <TicTacToe />
      </div>
    </div>
  );
}
