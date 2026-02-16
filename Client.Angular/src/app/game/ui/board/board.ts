import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {

  public readonly size = input.required<number>();

  protected _cells = computed(() => {
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
