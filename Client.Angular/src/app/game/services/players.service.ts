import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatchPlayer } from '../models/match-player';
import { PlayerId } from '../models/player';

@Injectable({ providedIn: 'root' })
export class PlayersService {
    private readonly _http = inject(HttpClient);

    public get(playerId: PlayerId): Observable<MatchPlayer> {
        return of({
            id: playerId,
            name: `Player #${playerId}`,
            iconCode: 'bird'
        } as MatchPlayer)
    }
}
