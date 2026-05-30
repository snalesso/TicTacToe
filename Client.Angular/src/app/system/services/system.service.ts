import { Injectable } from '@angular/core';
import { ServiceBase } from '../../shared/services/base.service';
import { SystemInfo } from '../models/SystemInfo';

@Injectable({ providedIn: 'root' })
export class SystemService extends ServiceBase {

  protected override _getPath(): string { return 'system'; }

  public getHello() {
    return this._http.get<string>(this._composeEndpoint('hello'));
  }
  public postEcho(text: string) {
    return this._http.post<string>(this._composeEndpoint('echo'), text);
  }
  public getAppName() {
    return this._http.get<string>(this._composeEndpoint('app-name'));
  }
  public getInfo() {
    return this._http.get<SystemInfo>(this._composeEndpoint('info'));
  }
}
