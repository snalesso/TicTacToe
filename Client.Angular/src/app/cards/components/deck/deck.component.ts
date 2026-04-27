import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'ttt-deck',
  imports: [CardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
})
export class DeckComponent {

}
