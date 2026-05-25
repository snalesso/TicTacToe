import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'ttt-deck',
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckComponent {

}
