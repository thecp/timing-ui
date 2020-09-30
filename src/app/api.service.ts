import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { tap } from 'rxjs/operators';

import { Block, Finisher } from './models';

const API = 'http://localhost:8081';
const WS = 'ws://localhost:8081';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  time$ = new BehaviorSubject<string>('00:00:00');
  private timer$: Observable<string> | null;
  private timerSubscription$: Subscription | null = null;

  constructor(private http: HttpClient) {}

  startTimer(offset: string): Observable<any> {
    return this.http.get<any>(`${API}/start-timer?offset=${offset}`).pipe(
      tap(() => {
        this.timer$ = this.getTime();
        this.timer$.subscribe((time) => {
          this.time$.next(time);
        });
      })
    );
  }

  stopTimer(): Observable<any> {
    return this.http.get<any>(`${API}/stop-timer`).pipe(
      tap(() => {
        if (this.timerSubscription$ != null) {
          this.timerSubscription$.unsubscribe();
          this.timerSubscription$ = null;
        }
        this.timer$ = null;
      })
    );
  }

  getTime(): Observable<string> {
    return webSocket(`${WS}/time`);
  }

  getBlocks(): Observable<Block[]> {
    return this.http.get<any>(`${API}/get-blocks`);
  }

  startBlock(id: number): Observable<any> {
    return this.http.get<any>(`${API}/start-block/${id}`);
  }

  topFinishers(): Observable<{ [key: string]: { [key: string]: Finisher[] } }> {
    return this.http.get<{ [key: string]: { [key: string]: Finisher[] } }>(
      `${API}/top-finishers`
    );
  }

  lastFinishers(): Observable<Finisher[]> {
    return this.http.get<Finisher[]>(`${API}/last-finishers`);
  }

  setFinisherTime(stno: number, time: string): Observable<any> {
    return this.http.get<any>(
      `${API}/set-finisher-time?stno=${stno}&time=${time}`
    );
  }
}
