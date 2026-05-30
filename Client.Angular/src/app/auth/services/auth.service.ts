import { Injectable } from '@angular/core';
import { ServiceBase } from '../../shared/services/base.service';
import { LoginRequest, LoginResponse } from '../models/login';
import { RegistrationRequest, RegistrationResponse } from '../models/registration';

@Injectable({ providedIn: 'root' })
export class AuthService extends ServiceBase {

  protected override _getPath(): string { return 'auth'; }

  public register(req: RegistrationRequest) {
    return this._http.post<RegistrationResponse>(this._composeEndpoint(`register`), req);
  }

  public login(req: LoginRequest) {
    return this._http.post<LoginResponse>(this._composeEndpoint(`login`), req);
  }
}
