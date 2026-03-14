import { computed, Injectable, signal } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { finalize, map, noop, Observable, take, tap, timer } from 'rxjs';
import { GameStatus } from '../models/game-status';

@Injectable({ providedIn: 'root' })
export class QueueService {
    private readonly _queueHubConfig = new SignalR.HubConnectionBuilder()
        .withUrl('https://localhost:5041/queue?name=deda')
        .withAutomaticReconnect();
    private readonly _queueHubConn: SignalR.HubConnection;

    private readonly _status = signal<GameStatus>(GameStatus.Idle);
    public readonly status = this._status.asReadonly();

    private readonly _isBusy = signal<boolean>(false);
    public readonly isBusy = this._isBusy.asReadonly();

    public readonly isIdle = computed(() => this.status() === GameStatus.Idle);
    public readonly isQueued = computed(() => this.status() === GameStatus.Queued);
    public readonly isPlaying = computed(() => this.status() === GameStatus.Playing);

    constructor() {
        this._queueHubConn = this._queueHubConfig.build();
        this._queueHubConn.on('PlayerJoined', (count: number) => {
            // this._roomSize.set(count);
        });
    }

    public async connect() {
        await this._queueHubConn.start();
    }

    public joinQueueReq(): Observable<void> {
        if (!this.isIdle())
            throw new Error('Cannot join queue.');
        this._isBusy.set(true);
        return timer(1200).pipe(
            take(1),
            tap(() => this._status.set(GameStatus.Queued)),
            finalize(() => this._isBusy.set(false)),
            map(noop));
    }

    public leaveQueueReq(): Observable<void> {
        if (!this.isQueued())
            throw new Error('Cannot join queue.');
        this._isBusy.set(true);
        return timer(1200).pipe(
            take(1),
            tap(() => this._status.set(GameStatus.Idle)),
            finalize(() => this._isBusy.set(false)),
            map(noop));
    }
}
