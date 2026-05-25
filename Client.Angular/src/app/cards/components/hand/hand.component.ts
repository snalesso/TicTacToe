import { NgFor, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../../models/card';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'ttt-hand',
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.scss',
  imports: [NgFor, NgForOf, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandComponent {

  protected readonly _cards: Card[] = [
    { id: 1, content: 'A' },
    { id: 2, content: 'B' },
    { id: 3, content: 'C' },
    { id: 4, content: 'D' },
    { id: 5, content: 'E' },
    { id: 6, content: 'F' },
  ];
}
