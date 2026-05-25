import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'ttt-v-content-test',
  imports: [],
  templateUrl: './v-content-test.component.html',
  styleUrl: './v-content-test.component.scss',
})
export class VContentTestComponent {
  public readonly count = input(20);
  public readonly items = computed(() => {
    const count = this.count();
    return Array(count).fill(0).map((_, i) => i + 1);
  })
}
