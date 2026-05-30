import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ServiceBase } from '../../shared/services/base.service';
import { LoginRequest, LoginResponse } from '../models/login';
import { RegistrationRequest, RegistrationResponse } from '../models/registration';
import { CurrentUserInfo } from '../models/user';

const JWT_STORAGE_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService extends ServiceBase {

  protected override _getPath(): string { return 'auth'; }

  private readonly _currentUser = signal<CurrentUserInfo | null>(null);
  public readonly currentUser = this._currentUser.asReadonly();

  public get token(): string | null {
    return localStorage.getItem(JWT_STORAGE_KEY);
  }

  public isLoggedIn(): boolean {
    return this.token !== null;
  }

  public register(req: RegistrationRequest) {
    return this._http.post<RegistrationResponse>(this._composeEndpoint(`register`), req);
  }

  public login(req: LoginRequest) {
    return this._http.post<LoginResponse>(this._composeEndpoint(`login`), req).pipe(
      tap(response => {
        localStorage.setItem(JWT_STORAGE_KEY, response.token);
        this._currentUser.set({ id: response.id, name: response.username });
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(JWT_STORAGE_KEY);
    this._currentUser.set(null);
  }
}
