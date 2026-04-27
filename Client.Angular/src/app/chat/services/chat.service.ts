import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpTransportType, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { map, Observable, of } from 'rxjs';
import { ServiceBase } from '../../core/services/base.service';
import { ChatRoomId, ChatRoomInfo, ChatRoomOption } from '../models/chat-connection-status';
import { ChatRoomStatus } from '../models/chat-room-snapshot';

@Injectable({ providedIn: 'root' })
export class ChatService extends ServiceBase {

    readonly #chatHubConn = new HubConnectionBuilder()
        .withUrl('http://localhost:5041/chat', {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Debug)
        .build();
    readonly #connectionStatus = signal<HubConnectionState>(HubConnectionState.Disconnected);
    public readonly hubConnectionStatus = this.#connectionStatus.asReadonly();
    public readonly isHubConnected = computed(() => this.hubConnectionStatus() === HubConnectionState.Connected);

    readonly #isBusy = signal<boolean>(false);
    public readonly isBusy = this.#isBusy.asReadonly();

    readonly #roomId = linkedSignal<boolean, ChatRoomId | null>({
        source: () => this.isHubConnected(),
        computation: (isHubConnected, curr) => {
            if (!isHubConnected)
                return null;
            if (curr === undefined)
                return null;
            return curr.value;
        },
    });
    public readonly roomId = this.#roomId.asReadonly();
    public readonly isInRoom = computed(() => this.roomId() != null);

    readonly #roomInfo = rxResource({
        defaultValue: null,
        params: () => this.roomId(),
        stream: ({ params: roomId }) => {
            if (roomId === null)
                return of(null);
            return this.getRoomInfo$(roomId);
        },
    });
    public readonly roomInfo = this.#roomInfo.asReadonly();

    readonly #roomStatus = rxResource({
        defaultValue: null,
        params: () => this.roomId(),
        stream: ({ params: roomId }) => {
            if (roomId === null)
                return of(null);
            return this.getRoomStatus$(roomId);
        },
    });
    public readonly roomStatus = this.#roomInfo.asReadonly();

    constructor() {
        super();

        this.#chatHubConn.onclose(error => {
            this.#connectionStatus.set(this.#chatHubConn.state);
        });
        this.#chatHubConn.onreconnected(connId => {
            this.#connectionStatus.set(this.#chatHubConn.state);
        });
        this.#chatHubConn.onreconnecting(error => {
            this.#connectionStatus.set(this.#chatHubConn.state);
        });
        this.#chatHubConn.on('RoomInfoChanged', () => {
            this.#roomInfo.reload();
        });
        this.#chatHubConn.on('RoomStatusChanged', () => {
            this.#roomInfo.reload();
        });
    }

    public async connectAsync() {

        if (this.isBusy())
            return;

        this.#isBusy.set(true);

        if (this.hubConnectionStatus() !== HubConnectionState.Disconnected)
            throw new Error('Cannot join chat: already joined.');

        this.#connectionStatus.set(HubConnectionState.Connecting);

        await this.#chatHubConn
            .start()
            .catch(error => {
                this.#connectionStatus.set(this.#chatHubConn.state);
            })
            .then(() => {
                this.#connectionStatus.set(this.#chatHubConn.state);
            }).finally(() => {
                this.#isBusy.set(false);
            });
    }

    public async disconnectAsync() {

        if (this.isBusy())
            return;

        this.#isBusy.set(true);

        if (this.hubConnectionStatus() !== HubConnectionState.Connected)
            throw new Error('Cannot leave chat: not joined.');

        this.#connectionStatus.set(HubConnectionState.Disconnecting);

        await this.#chatHubConn
            .stop()
            .catch(error => {
                this.#connectionStatus.set(this.#chatHubConn.state);
            })
            .then(() => {
                this.#connectionStatus.set(this.#chatHubConn.state);
            })
            .finally(() => {
                this.#isBusy.set(false);
            });
    }

    public async joinAsync(roomId: ChatRoomId) {
        if (this.isBusy())
            return;
        this.#isBusy.set(true);

        if (!this.isHubConnected())
            throw new Error('Cannot join chat room: not connected.');
        if (this.isInRoom())
            throw new Error('Cannot join chat room: already in a room.');

        await this.#chatHubConn.invoke<boolean>('Join', roomId)
            .catch((e: Error) => {
                console.log(e.message);
            })
            .then(() => {
                this.#roomId.set(roomId);
            })
            .finally(() => {
                this.#isBusy.set(false);
            });
    }

    public async leaveAsync() {
        if (this.isBusy())
            return;
        this.#isBusy.set(true);

        if (!this.isHubConnected())
            throw new Error('Cannot leave chat room: not connected to chat service.');
        if (!this.isInRoom())
            throw new Error('Cannot leave chat room: not in a room.');
        const roomId = this.roomId();
        if (!roomId)
            throw new Error('Cannot leave chat room: room ID not valid.');

        await this.#chatHubConn.invoke<void>('Leave', roomId)
            .catch((e: Error) => {
                console.log(e.message);
            })
            .then(() => {
                this.#roomId.set(null);
            })
            .finally(() => {
                this.#isBusy.set(false);
            });
    }

    public refreshRoomInfo(): void {
        this.#roomInfo.reload();
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
