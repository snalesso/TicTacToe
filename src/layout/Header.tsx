import './Header.scss';

export default function Header() {
  return (
    <header className='header w-100 px-4'>
      <div className='flex-row'>
        <div className='flex-col'>
          <div className='wrap-panel'>
            <label className='site-name m-3'>TicTacToe</label>
          </div>
        </div>
        <div className='flex-col d-flex-exp'></div>
      </div>
    </header>
  );
}