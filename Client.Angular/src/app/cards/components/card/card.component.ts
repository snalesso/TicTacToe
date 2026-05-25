import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ttt-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  @Input() value: string = '';
}
