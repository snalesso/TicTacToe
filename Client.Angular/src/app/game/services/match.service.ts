import { Injectable, signal } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { MatchSnapshot } from '../models/match-snapshot';

@Injectable({ providedIn: 'root' })
export class MatchService {
    private readonly _connection: SignalR.HubConnection;

    private readonly _snap = signal<MatchSnapshot | null>(null);
    public readonly snap = this._snap.asReadonly();

    private readonly _currentRoom = signal<string | null>(null);
    public readonly currentRoom = this._currentRoom.asReadonly();

    private readonly _roomSize = signal<number | null>(null);
    public readonly roomSize = this._roomSize.asReadonly();

    constructor() {
        this._connection = new SignalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/matches')
            .withAutomaticReconnect()
            .build();
        this._connection.on('RoomSizeUpdated', (count: number) => {
            this._roomSize.set(count);
        });
    }

    public async connect() {
        await this._connection.start();
    }

    public async joinAsync(roomId: string) {
        if (this.currentRoom())
            await this.leaveAsync();
        await this._connection.invoke('JoinRoom', roomId);
        this._currentRoom.set(roomId);
    }

    public async leaveAsync() {
        if (!this.currentRoom())
            return;
        await this._connection.invoke('LeaveRoom', this.currentRoom);
        this._currentRoom.set(null);
        this._roomSize.set(null);
    }
}
