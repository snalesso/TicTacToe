import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const PORT: number = 7082;
const PROTOCOL: 'http' | 'https' = 'https';

@Injectable()
export abstract class ServiceBase {

  protected readonly _http = inject(HttpClient);
  protected readonly _hostAddress = `${PROTOCOL}://localhost:${PORT}`;

  protected abstract _getPath(): string;
  protected _composeEndpoint(address: string = '') {
    return [this._hostAddress, address, this._getPath()].join('/');
  }
}
