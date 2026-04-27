import { Component, Input } from '@angular/core';

@Component({
  selector: 'ttt-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

  @Input() value: string = '';
}
