import { inject, Injectable, resource } from '@angular/core';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ServiceBase } from '../../shared/services/base.service';
import { ChatService } from './chat.service';

@Injectable({ providedIn: 'root' })
export class ChatRoomService extends ServiceBase {

  protected override _getPath(): string { return 'chat/room'; }

  readonly #chat = inject(ChatService);

  readonly #chatRoomHubConn = resource({
    params: () => this.#chat.roomId(),
    loader: ({ params: roomId }) => {
      if (roomId == null)
        return Promise.resolve(null);
      const hubConn = new HubConnectionBuilder()
        .withUrl(`http://localhost:5041/${this._getPath()}/${roomId}`, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Debug)
        .build();
      return Promise.resolve(hubConn);
    },
  });
}
