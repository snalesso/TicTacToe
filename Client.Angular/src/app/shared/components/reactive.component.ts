import { Directive, OnInit } from '@angular/core';
import { ReactiveInjectable } from './reactive.injectable';

@Directive()
export abstract class ReactiveComponent
  extends ReactiveInjectable
  implements OnInit
{
  public ngOnInit(): void {
    this.setup();
  }
}
