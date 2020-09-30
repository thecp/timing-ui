import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../api.service';
import { Finisher } from '../models';

@Component({
  selector: 'app-show-finishers',
  templateUrl: './show-finishers.component.html',
  styleUrls: ['./show-finishers.component.scss'],
})
export class ShowFinishersComponent implements OnInit, OnDestroy {
  finishers: Finisher[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .lastFinishers()
      .subscribe((finishers) => (this.finishers = finishers));
  }

  ngOnDestroy(): void {}
}
