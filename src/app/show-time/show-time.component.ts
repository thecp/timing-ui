import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-show-time',
  templateUrl: './show-time.component.html',
  styleUrls: ['./show-time.component.scss'],
})
export class ShowTimeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();

  time = '00:00:00';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.time$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((time) => (this.time = time));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
