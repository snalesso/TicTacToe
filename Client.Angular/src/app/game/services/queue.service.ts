import { computed, Injectable, signal } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { finalize, map, noop, Observable, take, tap, timer } from 'rxjs';
import { GameStatus } from '../models/game-status';

@Injectable({ providedIn: 'root' })
export class QueueService {
    readonly #queueHubConfig = new SignalR.HubConnectionBuilder()
        .withUrl('https://localhost:5041/queue?name=deda')
        .withAutomaticReconnect();
    readonly #queueHubConn: SignalR.HubConnection;

    readonly #status = signal<GameStatus>(GameStatus.Idle);
    public readonly status = this.#status.asReadonly();

    readonly #isBusy = signal<boolean>(false);
    public readonly isBusy = this.#isBusy.asReadonly();

    public readonly isIdle = computed(() => this.status() === GameStatus.Idle);
    public readonly isQueued = computed(() => this.status() === GameStatus.Queued);
    public readonly isPlaying = computed(() => this.status() === GameStatus.Playing);

    constructor() {
        this.#queueHubConn = this.#queueHubConfig.build();
        this.#queueHubConn.on('PlayerJoined', (count: number) => {
            // this.#roomSize.set(count);
        });
    }

    public async connect() {
        await this.#queueHubConn.start();
    }

    public joinQueueReq(): Observable<void> {
        if (!this.isIdle())
            throw new Error('Cannot join queue.');
        this.#isBusy.set(true);
        return timer(1200).pipe(
            take(1),
            tap(() => this.#status.set(GameStatus.Queued)),
            finalize(() => this.#isBusy.set(false)),
            map(noop));
    }

    public leaveQueueReq(): Observable<void> {
        if (!this.isQueued())
            throw new Error('Cannot join queue.');
        this.#isBusy.set(true);
        return timer(1200).pipe(
            take(1),
            tap(() => this.#status.set(GameStatus.Idle)),
            finalize(() => this.#isBusy.set(false)),
            map(noop));
    }
}
