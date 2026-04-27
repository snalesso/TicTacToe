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
  readonly #queue = inject(QueueService);

  public readonly status = this.#queue.status;

  public readonly isJoinQueueBtnEnabled = computed(() => !this.#queue.isBusy() && this.#queue.isIdle());
  public readonly isJoinQueueBtnVisible = computed(() => this.#queue.isIdle());
  protected _joinQueue(): void {
    this.subscribe(this.#queue.joinQueueReq());
  }
  
  public readonly isLeaveQueueBtnEnabled = computed(() => !this.#queue.isBusy() && this.#queue.isQueued());
  public readonly isLeaveQueueBtnVisible = computed(() => this.#queue.isQueued());
  protected _leaveQueue(): void {
    this.subscribe(this.#queue.leaveQueueReq());
  }
}
