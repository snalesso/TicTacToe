import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, resource } from '@angular/core';
import { RouterLink } from "@angular/router";
import { catchError, firstValueFrom, of } from 'rxjs';
import { SystemService } from '../../../system/services/system.service';

@Component({
  selector: 'ttt-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  imports: [RouterLink],
})
export class AppHeaderComponent {

  private readonly _systemSvc = inject(SystemService);

  public readonly _appName = resource({
    defaultValue: 'Loading ...',
    loader: async () => {
      const appName = await firstValueFrom(this._systemSvc.getAppName().pipe(
        catchError((error: HttpErrorResponse) => {
          return of(`Failure: ${error.message}`);
        })));
      return appName;
    },
  });
  public readonly appName = 'Tic Tac Toe';

  public readonly _sysInfo = resource({
    defaultValue: undefined,
    loader: async () => {
      const sysInfo = await firstValueFrom(this._systemSvc.getInfo().pipe(
        catchError((error: HttpErrorResponse) => {
          return of(null);
        })));
      return sysInfo;
    },
  });
  public readonly sysInfo = this._sysInfo.value.asReadonly();
}
