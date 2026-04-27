import { Component } from '@angular/core';
import { DeckComponent } from "../deck/deck.component";
import { HandComponent } from "../hand/hand.component";

@Component({
  selector: 'ttt-cards-game',
  imports: [HandComponent, DeckComponent],
  templateUrl: './cards-game.component.html',
  styleUrl: './cards-game.component.scss',
})
export class CardsGameComponent {

}
