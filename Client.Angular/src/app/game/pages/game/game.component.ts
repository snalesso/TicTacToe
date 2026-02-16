import { Component } from '@angular/core';
import { MatchComponent } from '../../components/match/match.component';

@Component({
  selector: 'ttt-game',
  imports: [MatchComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent { }
