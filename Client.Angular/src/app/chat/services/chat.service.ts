import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpTransportType, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { map, Observable, of } from 'rxjs';
import { ServiceBase } from '../../core/services/base.service';
import { ChatRoomId, ChatRoomInfo, ChatRoomOption } from '../models/chat-connection-status';
import { ChatRoomStatus } from '../models/chat-room-snapshot';

@Injectable({ providedIn: 'root' })
export class ChatService extends ServiceBase {

    private readonly _chatHubConn = new HubConnectionBuilder()
        .withUrl('http://localhost:5041/chat', {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Debug)
        .build();
    private readonly _connectionStatus = signal<HubConnectionState>(HubConnectionState.Disconnected);
    public readonly hubConnectionStatus = this._connectionStatus.asReadonly();
    public readonly isHubConnected = computed(() => this.hubConnectionStatus() === HubConnectionState.Connected);

    private readonly _isBusy = signal<boolean>(false);
    public readonly isBusy = this._isBusy.asReadonly();

    private readonly _roomId = linkedSignal<boolean, ChatRoomId | null>({
        source: () => this.isHubConnected(),
        computation: (isHubConnected, curr) => {
            if (!isHubConnected)
                return null;
            if (curr === undefined)
                return null;
            return curr.value;
        },
    });
    public readonly roomId = this._roomId.asReadonly();
    public readonly isInRoom = computed(() => this.roomId() != null);

    private readonly _roomInfo = rxResource({
        defaultValue: null,
        params: () => this.roomId(),
        stream: ({ params: roomId }) => {
            if (roomId === null)
                return of(null);
            return this.getRoomInfo$(roomId);
        },
    });
    public readonly roomInfo = this._roomInfo.asReadonly();

    private readonly _roomStatus = rxResource({
        defaultValue: null,
        params: () => this.roomId(),
        stream: ({ params: roomId }) => {
            if (roomId === null)
                return of(null);
            return this.getRoomStatus$(roomId);
        },
    });
    public readonly roomStatus = this._roomInfo.asReadonly();

    constructor() {
        super();

        this._chatHubConn.onclose(error => {
            this._connectionStatus.set(this._chatHubConn.state);
        });
        this._chatHubConn.onreconnected(connId => {
            this._connectionStatus.set(this._chatHubConn.state);
        });
        this._chatHubConn.onreconnecting(error => {
            this._connectionStatus.set(this._chatHubConn.state);
        });
        this._chatHubConn.on('RoomInfoChanged', () => {
            this._roomInfo.reload();
        });
        this._chatHubConn.on('RoomStatusChanged', () => {
            this._roomInfo.reload();
        });
    }

    public async connectAsync() {

        if (this.isBusy())
            return;

        this._isBusy.set(true);

        if (this.hubConnectionStatus() !== HubConnectionState.Disconnected)
            throw new Error('Cannot join chat: already joined.');

        this._connectionStatus.set(HubConnectionState.Connecting);

        await this._chatHubConn
            .start()
            .catch(error => {
                this._connectionStatus.set(this._chatHubConn.state);
            })
            .then(() => {
                this._connectionStatus.set(this._chatHubConn.state);
            }).finally(() => {
                this._isBusy.set(false);
            });
    }

    public async disconnectAsync() {

        if (this.isBusy())
            return;

        this._isBusy.set(true);

        if (this.hubConnectionStatus() !== HubConnectionState.Connected)
            throw new Error('Cannot leave chat: not joined.');

        this._connectionStatus.set(HubConnectionState.Disconnecting);

        await this._chatHubConn
            .stop()
            .catch(error => {
                this._connectionStatus.set(this._chatHubConn.state);
            })
            .then(() => {
                this._connectionStatus.set(this._chatHubConn.state);
            })
            .finally(() => {
                this._isBusy.set(false);
            });
    }

    public async joinAsync(roomId: ChatRoomId) {
        if (this.isBusy())
            return;
        this._isBusy.set(true);

        if (!this.isHubConnected())
            throw new Error('Cannot join chat room: not connected.');
        if (this.isInRoom())
            throw new Error('Cannot join chat room: already in a room.');

        await this._chatHubConn.invoke<boolean>('Join', roomId)
            .catch((e: Error) => {
                console.log(e.message);
            })
            .then(() => {
                this._roomId.set(roomId);
            })
            .finally(() => {
                this._isBusy.set(false);
            });
    }

    public async leaveAsync() {
        if (this.isBusy())
            return;
        this._isBusy.set(true);

        if (!this.isHubConnected())
            throw new Error('Cannot leave chat room: not connected to chat service.');
        if (!this.isInRoom())
            throw new Error('Cannot leave chat room: not in a room.');
        const roomId = this.roomId();
        if (!roomId)
            throw new Error('Cannot leave chat room: room ID not valid.');

        await this._chatHubConn.invoke<void>('Leave', roomId)
            .catch((e: Error) => {
                console.log(e.message);
            })
            .then(() => {
                this._roomId.set(null);
            })
            .finally(() => {
                this._isBusy.set(false);
            });
    }

    public refreshRoomInfo(): void {
        this._roomInfo.reload();
    }

    public getRoomInfo$(roomId: ChatRoomId): Observable<ChatRoomInfo> {
        return this.getAllRooms$().pipe(map(rooms => {
            const room = rooms.find(r => r.id === roomId);
            if (room == null)
                throw new Error(`Could not find room with ID: ${roomId}.`);
            return ({
                id: room.id,
                name: room.name,
                description: room.description
            } as ChatRoomInfo);
        }))
    }

    public getRoomStatus$(roomId: ChatRoomId): Observable<ChatRoomStatus> {
        return of({
            id: roomId,
            userIds: [1, 4465, 3, 765, 2181]
        } as ChatRoomStatus);
    }

    public getAllRooms$() {
        return this._http.get<ReadonlyArray<ChatRoomOption>>(this._composeEndpoint('chat/rooms'));
    }
}
