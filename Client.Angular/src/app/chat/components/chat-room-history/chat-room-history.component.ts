import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ChatMessage } from '../../models/chat-message';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-room-history',
  templateUrl: './chat-room-history.component.html',
  imports: [DatePipe],
})
export class ChatHistoryComponent {

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
