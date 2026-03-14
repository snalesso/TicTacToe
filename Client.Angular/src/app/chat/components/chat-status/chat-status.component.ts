import { Component, inject, OnInit } from '@angular/core';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-status',
  templateUrl: './chat-status.component.html',
  imports: [],
})
export class ChatStatusComponent extends ReactiveComponent implements OnInit {
  private readonly _chatSvc = inject(ChatService);

  public readonly connectionStatus = this._chatSvc.hubConnectionStatus;

}
