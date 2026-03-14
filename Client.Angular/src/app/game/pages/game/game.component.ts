import { Component, computed, signal } from '@angular/core';
import { ChatComponent } from '../../../chat/components/chat/chat.component';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { QueueComponent } from "../../components/queue/queue.component";
import { MatchId } from '../../models/match-snapshot';

@Component({
  selector: 'ttt-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  imports: [ChatComponent, QueueComponent],
})
export class GameComponent extends ReactiveComponent {

  private readonly _matchId = signal<MatchId | null>(null);
  public readonly matchId = this._matchId.asReadonly();

  public readonly isMatchAvailable = computed(() => this.matchId() != null);
}
