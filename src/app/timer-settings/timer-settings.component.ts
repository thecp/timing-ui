import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-timer-settings',
  templateUrl: './timer-settings.component.html',
  styleUrls: ['./timer-settings.component.scss'],
})
export class TimerSettingsComponent implements OnInit {
  offset = '00:00:00';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  startTime(): void {
    this.apiService.startTimer(this.offset).subscribe();
  }

  stopTime(): void {
    this.apiService.stopTimer().subscribe();
  }
}
