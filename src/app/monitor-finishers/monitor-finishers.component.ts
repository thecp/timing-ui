import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-monitor-finishers',
  templateUrl: './monitor-finishers.component.html',
  styleUrls: ['./monitor-finishers.component.scss'],
})
export class MonitorFinishersComponent implements OnInit {
  time = '';
  stno?: number;

  timePattern = /\d{2}:\d{2}:\d{2}$/;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  update(): void {
    this.apiService.setFinisherTime(this.stno, this.time).subscribe(() => {
      this.time = '';
      delete this.stno;
    });
  }
}
