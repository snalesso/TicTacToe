import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatRoomHeaderComponent } from "../chat-room-header/chat-room-header.component";
import { ChatHistoryComponent } from '../chat-room-history/chat-room-history.component';
import { ChatRoomSenderComponent } from '../chat-room-sender/chat-room-sender.component';

@Component({
  selector: 'ttt-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
  imports: [ChatHistoryComponent, ChatRoomSenderComponent, ChatRoomHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomComponent extends ReactiveComponent {
}
