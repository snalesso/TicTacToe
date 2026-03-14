import { Component, computed, inject, OnInit } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { from, Subscription } from 'rxjs';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-room-header',
  templateUrl: './chat-room-header.component.html',
  imports: [FaIconComponent],
})
export class ChatRoomHeaderComponent extends ReactiveComponent implements OnInit {
  private readonly _chatSvc = inject(ChatService);

  public readonly connectionStatus = this._chatSvc.hubConnectionStatus;
  public readonly isConnected = this._chatSvc.isHubConnected;

  public readonly isLeaveBtnVisible = computed(() => this.isConnected() && this._chatSvc.isInRoom());
  public readonly isLeaveBtnEnabled = computed(() => this.isLeaveBtnVisible() && !this._chatSvc.isBusy());

  public readonly name = computed(() => this._chatSvc.roomInfo.value()?.name);
  public readonly description = computed(() => this._chatSvc.roomInfo.value()?.description);
  
  protected leaveRoom(): Subscription {
    return this.subscribe(from(this._chatSvc.leaveAsync()));
  }

}
