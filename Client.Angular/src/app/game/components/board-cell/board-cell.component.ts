import { Component, input } from '@angular/core';
import { PlayerId } from '../../models/player';

@Component({
  selector: 'ttt-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrl: './board-cell.component.scss',
  imports: [],
})
export class BoardCellComponent {

  public readonly playerId = input.required<PlayerId | null>();

  protected _onClick() {
    if (this.playerId())
      throw new Error('Cell is not empty');
  }
}
