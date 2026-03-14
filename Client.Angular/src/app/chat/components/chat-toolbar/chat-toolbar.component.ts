import { Component, computed, inject, OnInit } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { from } from 'rxjs';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-toolbar',
  templateUrl: './chat-toolbar.component.html',
  imports: [],
})
export class ChatToolbarComponent extends ReactiveComponent implements OnInit {
  private readonly _chatSvc = inject(ChatService);

  public readonly status = this._chatSvc.hubConnectionStatus;
  public readonly isDisconnected = computed(() => this.status() === SignalR.HubConnectionState.Disconnected);
  public readonly isConnecting = computed(() => this.status() === SignalR.HubConnectionState.Connecting);
  public readonly isConnected = computed(() => this.status() === SignalR.HubConnectionState.Connected);
  public readonly isReconnecting = computed(() => this.status() === SignalR.HubConnectionState.Reconnecting);
  public readonly isDisconnecting = computed(() => this.status() === SignalR.HubConnectionState.Disconnecting);

  public connect() {
    return this.subscribe(from(this._chatSvc.connectAsync()));
  }
}
