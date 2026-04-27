import { DestroyRef, inject, Injectable, Output } from "@angular/core";
import { merge, Observable, PartialObserver, Subject, Subscription, takeUntil } from "rxjs";

@Injectable()
export abstract class ReactiveInjectable {

  protected readonly _destructionRef = inject(DestroyRef);

  readonly #destruction$$ = new Subject<void>();
  @Output() public readonly destroyed$ = this.#destruction$$.asObservable();

  constructor() {
    const unregister = this._destructionRef.onDestroy(() => {
      this.#destruction$$.next();
      this.#destruction$$.complete();
      unregister();
    });
    this.registerEffects();
  }

  protected subscribe<T>(obs$: Observable<T>): Subscription;
  protected subscribe<T>(obs$: Observable<T>, observer: PartialObserver<T>): Subscription;
  protected subscribe<T>(obs$: Observable<T>, observer?: PartialObserver<T>): Subscription {
    // this is not an injection context, so we cannot use `takeUntilDestroyed`
    return obs$.pipe(takeUntil(this.destroyed$)).subscribe(observer);
  }

  protected registerEffects(): void { }

  protected getAutoSubObs(): ReadonlyArray<Observable<unknown>> {
    return [];
  }
  private connectReactiveChains(): void {
    this.subscribe(merge(...this.getAutoSubObs()));
  }
  protected registerHandlers(): void { }

  protected setup(): void {
    this.connectReactiveChains();
    this.registerHandlers();
  }
}
