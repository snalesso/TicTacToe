import { Injectable, signal } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { MatchSnapshot } from '../models/match-snapshot';

@Injectable({ providedIn: 'root' })
export class MatchService {
    readonly #connection: SignalR.HubConnection;

    readonly #snap = signal<MatchSnapshot | null>(null);
    public readonly snap = this.#snap.asReadonly();

    readonly #currentRoom = signal<string | null>(null);
    public readonly currentRoom = this.#currentRoom.asReadonly();

    readonly #roomSize = signal<number | null>(null);
    public readonly roomSize = this.#roomSize.asReadonly();

    constructor() {
        this.#connection = new SignalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/matches')
            .withAutomaticReconnect()
            .build();
        this.#connection.on('RoomSizeUpdated', (count: number) => {
            this.#roomSize.set(count);
        });
    }

    public async connect() {
        await this.#connection.start();
    }

    public async joinAsync(roomId: string) {
        if (this.currentRoom())
            await this.leaveAsync();
        await this.#connection.invoke('JoinRoom', roomId);
        this.#currentRoom.set(roomId);
    }

    public async leaveAsync() {
        if (!this.currentRoom())
            return;
        await this.#connection.invoke('LeaveRoom', this.currentRoom);
        this.#currentRoom.set(null);
        this.#roomSize.set(null);
    }
}
