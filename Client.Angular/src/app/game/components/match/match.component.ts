import { Component, inject, input } from '@angular/core';
import { MatchId } from '../../models/match-snapshot';
import { MatchService } from '../../services/match.service';
import { BoardComponent } from '../board/board.component';
import { MatchPlayerComponent } from '../match-player/match-player.component';

@Component({
  selector: 'ttt-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss',
  imports: [MatchPlayerComponent, BoardComponent],
})
export class MatchComponent {
  private readonly _match = inject(MatchService);

  public readonly matchId = input.required<MatchId | null>()
}
