import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  imports: [],
  templateUrl: './board-cell.html',
  styleUrl: './board-cell.scss',
})
export class BoardCell {
  
  private readonly _isSet = signal<boolean>(false);
  public readonly isSet = this._isSet.asReadonly();

  protected _onClick() {
    if (this._isSet()) 
      throw new Error('Cell is not empty');
    this._isSet.set(true);
  }
}
