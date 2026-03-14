import { Component, computed, inject, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-room-toolbar',
  templateUrl: './chat-room-toolbar.component.html',
  imports: [],
})
export class ChatRoomToolbarComponent extends ReactiveComponent implements OnInit {
  private readonly _chatSvc = inject(ChatService);

  public readonly connectionStatus = this._chatSvc.hubConnectionStatus;
  public readonly isConnected = this._chatSvc.isHubConnected;

  public readonly isLeaveBtnVisible = computed(() => this.isConnected() && this._chatSvc.isInRoom());
  public readonly isLeaveBtnEnabled = computed(() => this.isLeaveBtnVisible() && !this._chatSvc.isBusy());
  
  protected leaveRoom(): Subscription {
    return this.subscribe(from(this._chatSvc.leaveAsync()));
  }

}
