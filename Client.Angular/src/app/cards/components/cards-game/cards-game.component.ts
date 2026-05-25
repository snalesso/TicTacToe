import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeckComponent } from "../deck/deck.component";
import { HandComponent } from "../hand/hand.component";

@Component({
  selector: 'ttt-cards-game',
  templateUrl: './cards-game.component.html',
  styleUrl: './cards-game.component.scss',
  imports: [HandComponent, DeckComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsGameComponent {

}
