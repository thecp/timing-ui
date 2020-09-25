import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

import { Starter, Finisher } from './models';

const API = 'http://localhost:8081';
const WS = 'ws://localhost:8081';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /*startReader(): Observable<any> {
    return this.http.post(`${API}/start-reader`, null);
  }

  stopReader(): Observable<any> {
    return this.http.post(`${API}/stop-reader`, null);
  }

  getTimers(): Observable<any[]> {
    return this.http.get<any[]>(`${API}/get-timers`);
  }

  addTimer(startTime: string): Observable<any> {
    return this.http.post(`${API}/add-timer`, {
      startTime,
    });
  }

  deleteTimer(i: number): Observable<any> {
    return this.http.post(`${API}/delete-timer`, {
      i,
    });
  }

  startTimer(i: number): Observable<any> {
    return this.http.post(`${API}/start-timer`, {
      i,
    });
  }

  stopTimer(i: number): Observable<any> {
    return this.http.post(`${API}/stop-timer`, {
      i,
    });
  }

  clearTimer(i: number): Observable<any> {
    return this.http.post(`${API}/clear-timer`, {
      i,
    });
  }

  getHealth(): Observable<any> {
    return webSocket(`${WS}/health`);
  }

  setTimeStart(time: string, stno: number): Observable<any> {
    return this.http.post(`${API}/set-time-start`, {
      time,
      stno,
    });
  }

  setTimeFinish(time: string, stno: number): Observable<any> {
    return this.http.post(`${API}/set-time-finish`, {
      time,
      stno,
    });
  }

  getStarters(next: number): Observable<Starter[]> {
    return webSocket(`${WS}/next-starters?top=${next}`);
  }

  getFinishers(last: number): Observable<Finisher[]> {
    return webSocket(`${WS}/last-finishers?top=${last}`);
  }

  getTopFinishers(top: number, filter: object | null): Observable<Finisher[]> {
    return this.http.get<Finisher[]>(`${API}/top-finishers?top=${top}`, filter);
  }*/

  startTimer(offset: string): Observable<any> {
    return this.http.get<any>(`${API}/start-timer?offset=${offset}`);
  }

  getTime(): Observable<string> {
    return webSocket(`${WS}/time`);
  }

  getBlocks(): Observable<any> {
    return this.http.get<any>(`${API}/get-block`);
  }

  startBlock(startTime: string): Observable<any> {
    return this.http.get<any>(`${API}/start-block?start-time=${startTime}`);
  }
}
