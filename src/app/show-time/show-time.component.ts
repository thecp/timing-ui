import { Component, OnInit, OnDestroy } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-show-time',
  templateUrl: './show-time.component.html',
  styleUrls: ['./show-time.component.scss'],
})
export class ShowTimeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();

  time = '00:00:00';

  constructor() {}

  ngOnInit(): void {
    const subject = webSocket('ws://localhost:8081');

    subject.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
      (time: string) => (this.time = time),
      (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
