import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatMessage } from '../../models/chat-message';
import { ChatService } from '../../services/chat.service';
import { ChatHistoryComponent } from '../chat-room-history/chat-room-history.component';
import { ChatRoomSenderComponent } from '../chat-room-sender/chat-room-sender.component';
import { ChatRoomToolbarComponent } from "../chat-room-toolbar/chat-room-toolbar.component";

@Component({
  selector: 'ttt-chat-room',
  templateUrl: './chat-room.component.html',
  imports: [ChatHistoryComponent, ChatRoomSenderComponent, ChatRoomToolbarComponent],
})
export class ChatRoomComponent extends ReactiveComponent {

  private readonly _chatSvc = inject(ChatService);

  public readonly name = computed(() => this._chatSvc.roomInfo.value()?.name);
  public readonly description = computed(() => this._chatSvc.roomInfo.value()?.description);

  private readonly _messages = rxResource({
    defaultValue: [],
    stream: () => of(Array(7).fill(0).map((_, i) => ({
      id: ++i,
      timestamp: new Date(),
      authorId: (i % 3) + 1,
      text: `Message #${i}`
    } as ChatMessage)))
  });
  public readonly messages = this._messages.asReadonly();

}
