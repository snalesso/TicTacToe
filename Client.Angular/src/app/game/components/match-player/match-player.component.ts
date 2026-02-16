import { Component, input } from '@angular/core';
import { PlayerId } from '../../models/player';

@Component({
  selector: 'ttt-match-player',
  templateUrl: './match-player.component.html',
  styleUrl: './match-player.component.scss',
  imports: [],
})
export class MatchPlayerComponent {
  public readonly playerId = input.required<PlayerId>();
}
