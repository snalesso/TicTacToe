import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MatchSnapshot } from '../models/match-snapshot';

@Injectable({ providedIn: 'root' })
export class MatchService {
    private readonly _http = inject(HttpClient);

    private readonly _snap = signal<MatchSnapshot | null>(null);
    public readonly snap = this._snap.asReadonly();
}
