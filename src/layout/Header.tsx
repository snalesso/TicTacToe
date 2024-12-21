import './Header.scss';

export default function Header() {
  return (
    <header className='header w-100 px-4'>
      <div className='row'>
        <div className='col'>
          <div className='wrap-panel'>
            <label className='site-name m-3'>TicTacToe</label>
          </div>
        </div>
        <div className='col d-flex-exp'></div>
      </div>
    </header>
  );
}