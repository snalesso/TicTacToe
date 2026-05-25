import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.html',
  styleUrl: './items.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class Items {
  public readonly count = input<number>(10);
  public readonly items = computed(() => Array.from({ length: this.count() }, (_, i) => i + 1));
}
