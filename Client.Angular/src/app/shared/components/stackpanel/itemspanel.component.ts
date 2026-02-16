import { Component, computed, input } from '@angular/core';
import { BsBreakpoint } from '../../models/bs-breakpoint';
import { Orientation } from '../../models/orientation';

@Component({
  selector: 'ttt-itemspanel',
  templateUrl: './itemspanel.component.html',
  styleUrl: './itemspanel.component.scss',
})
export class ItemspanelComponent {

  public readonly orientation = input<Orientation>(Orientation.Horizontal);
  public readonly isHorizontal = computed(() => this.orientation() === Orientation.Horizontal);
  public readonly isVertical = computed(() => this.orientation() === Orientation.Vertical);

  public readonly canWrap = input<boolean>(false);

  public readonly gap = input<BsBreakpoint | null>(null);
}
