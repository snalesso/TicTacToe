import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { from, Subscription } from 'rxjs';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatRoomId } from '../../models/chat-connection-status';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-room-selector',
  templateUrl: './chat-room-selector.component.html',
  imports: [],
})
export class ChatRoomSelectorComponent extends ReactiveComponent {

  private readonly _chatSvc = inject(ChatService);

  private readonly _rooms = rxResource({
    defaultValue: [],
    stream: () => this._chatSvc.getAllRooms$()
  });
  public readonly rooms = this._rooms.asReadonly();

  public readonly isJoinBtnVisible = computed(() => this._chatSvc.isHubConnected() && !this._chatSvc.isInRoom());
  public readonly isJoinBtnEnabled = computed(() => this.isJoinBtnVisible() && !this._chatSvc.isBusy());

  protected joinRoom(roomId: ChatRoomId): Subscription {
    const rooms = this.rooms.value();
    const room = rooms.find(r => r.id === roomId);
    if (room === undefined)
      throw new Error(`Room not available.`);
    if (!room?.isAccessible)
      throw new Error(`Room is not accessible.`);
    return this.subscribe(from(this._chatSvc.joinAsync(room.id)));
  }
}
