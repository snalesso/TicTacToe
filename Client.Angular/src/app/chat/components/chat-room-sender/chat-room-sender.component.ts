import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'ttt-chat-room-sender',
  templateUrl: './chat-room-sender.component.html',
  imports: [ReactiveFormsModule, FormField, FaIconComponent],
})
export class ChatRoomSenderComponent extends ReactiveComponent implements OnInit {
  private readonly _chatSvc = inject(ChatService);

  protected readonly _roomName = computed(() => this._chatSvc.roomInfo.value()?.name ?? '...');

  private readonly _message = signal<{ text: string }>({ text: '' });
  protected readonly _form = form(this._message, schemaPath => {
    required(schemaPath.text);
    minLength(schemaPath.text, 1);
    maxLength(schemaPath.text, 100);
    pattern(schemaPath.text, /^.*[^\s\t\r\n].*$/); // at least one meaningful char
  });

}
