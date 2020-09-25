import { Component } from '@angular/core';
import { retry } from 'rxjs/operators';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'timing-ui';
  offset = '00:00:00';

  showSidenav = false;
  links: [link: string, label: string][] = [
    ['foo', 'Foo'],
    ['bla', 'BliBlaBlubb'],
  ];

  constructor(private apiService: ApiService) {
    this.apiService.getTime().subscribe((time) => console.log(time));
  }

  startTime(): void {
    this.apiService.startTimer(this.offset).subscribe();
  }
}
