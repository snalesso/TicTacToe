import { Injectable } from '@angular/core';
import { ServiceBase } from '../../core/services/base.service';
import { SystemInfo } from '../models/SystemInfo';

@Injectable({ providedIn: 'root' })
export class SystemService extends ServiceBase {

    public getHello() {
        return this._http.get<string>(this._composeEndpoint('hello'));
    }
    public postEcho(text: string = 'this message should be echoed') {
        return this._http.post<string>(this._composeEndpoint('echo'), text);
    }
    public getAppName() {
        return this._http.get<string>(this._composeEndpoint('system/app-name'));
    }
    public getInfo() {
        return this._http.get<SystemInfo>(this._composeEndpoint('system/info'));
    }
}
