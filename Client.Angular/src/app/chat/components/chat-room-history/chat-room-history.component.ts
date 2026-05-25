import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ChatRoomService } from '../../services/chat-room.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-room-history',
  templateUrl: './chat-room-history.component.html',
  styleUrl: './chat-room-history.component.scss',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHistoryComponent {

  readonly #chatSvc = inject(ChatService);
  readonly #chatRoom = inject(ChatRoomService);

  readonly #messages = rxResource({
    defaultValue: [],
    params: this.#chatSvc.roomId,
    stream: ({ params: roomId }) => {
      if (roomId == null)
        return of([]);
      return this.#chatSvc.getRoomMessages$(roomId);
    }
  });
  public readonly messages = this.#messages.asReadonly();
}
