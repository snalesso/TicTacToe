import { Component, computed, input } from '@angular/core';
import { BoardCellComponent } from '../board-cell/board-cell.component';

@Component({
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  imports: [BoardCellComponent],
})
export class BoardComponent {

  public readonly size = input.required<number>();

  protected readonly _cells = computed(() => {
    const size = this.size();
    const rows = Array(size).fill(0);
    for (let r = 0; r < size; r++) {
      const cols = Array(size).fill(0);
      for (let c = 0; c < size * size; c++) {
        cols.push(c);
      }
      rows.push(cols);
    }
    return rows;
  });
}
