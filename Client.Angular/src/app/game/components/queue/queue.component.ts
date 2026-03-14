import { Component, computed, inject } from '@angular/core';
import { ReactiveComponent } from '../../../shared/components/reactive.component';
import { QueueService } from '../../services/queue.service';

@Component({
  selector: 'ttt-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss',
  imports: [],
})
export class QueueComponent extends ReactiveComponent {
  private readonly _queue = inject(QueueService);

  public readonly status = this._queue.status;

  public readonly isJoinQueueBtnEnabled = computed(() => !this._queue.isBusy() && this._queue.isIdle());
  public readonly isJoinQueueBtnVisible = computed(() => this._queue.isIdle());
  protected _joinQueue(): void {
    this.subscribe(this._queue.joinQueueReq());
  }
  
  public readonly isLeaveQueueBtnEnabled = computed(() => !this._queue.isBusy() && this._queue.isQueued());
  public readonly isLeaveQueueBtnVisible = computed(() => this._queue.isQueued());
  protected _leaveQueue(): void {
    this.subscribe(this._queue.leaveQueueReq());
  }
}
