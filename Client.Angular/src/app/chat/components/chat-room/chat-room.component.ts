import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatMessage } from '../../models/chat-message';
import { ChatService } from '../../services/chat.service';
import { ChatRoomHeaderComponent } from "../chat-room-header/chat-room-header.component";
import { ChatHistoryComponent } from '../chat-room-history/chat-room-history.component';
import { ChatRoomSenderComponent } from '../chat-room-sender/chat-room-sender.component';

@Component({
  selector: 'ttt-chat-room',
  templateUrl: './chat-room.component.html',
  imports: [ChatHistoryComponent, ChatRoomSenderComponent, ChatRoomHeaderComponent],
})
export class ChatRoomComponent extends ReactiveComponent {

  private readonly _chatSvc = inject(ChatService);

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
