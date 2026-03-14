import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatService } from '../../services/chat.service';
import { ChatRoomSelectorComponent } from "../chat-room-selector/chat-room-selector.component";
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { ChatToolbarComponent } from "../chat-toolbar/chat-toolbar.component";

@Component({
  selector: 'ttt-chat',
  templateUrl: './chat.component.html',
  imports: [ChatToolbarComponent, ChatRoomComponent, ChatRoomSelectorComponent, ChatToolbarComponent],
})
export class ChatComponent extends ReactiveComponent implements OnInit, OnDestroy {

  private readonly _chatSvc = inject(ChatService);

  public readonly isToolbarVisible = computed(() => !this._chatSvc.isHubConnected());
  public readonly isRoomSelectorVisible = computed(() => this._chatSvc.isHubConnected() && !this._chatSvc.isInRoom());
  public readonly isRoomVisible = computed(() => this._chatSvc.isHubConnected() && this._chatSvc.isInRoom());

  public override ngOnInit(): void {
    super.ngOnInit();
    this.subscribe(from(this._chatSvc.connectAsync()));
  }

  public ngOnDestroy(): void {
    this.subscribe(from(this._chatSvc.disconnectAsync()));
  }
}
