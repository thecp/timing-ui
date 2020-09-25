import { Component, OnInit, OnDestroy } from '@angular/core';

import { Starter } from '../models';
import { ApiService } from '../api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-show-starters',
  templateUrl: './show-starters.component.html',
  styleUrls: ['./show-starters.component.scss'],
})
export class ShowStartersComponent implements OnInit, OnDestroy {
  next: 10;
  emphasize: 2;

  startersEmphasize: Starter[] = [];
  startersRest: Starter[] = [];

  time: string;

  private ngUnsubscribe$ = new Subject();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    /*this.api
      .getStarters(this.next)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((starters) => {
        this.startersEmphasize = starters.splice(
          0,
          Math.max(2, starters.length)
        );
        this.startersRest = starters;
      });*/
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
