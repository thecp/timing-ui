import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Finisher } from '../models';

@Component({
  selector: 'app-show-top-finishers',
  templateUrl: './show-top-finishers.component.html',
  styleUrls: ['./show-top-finishers.component.scss'],
})
export class ShowTopFinishersComponent implements OnInit {
  finishers: { [key: string]: { [key: string]: Finisher[] } } | null = null;
  displayedColumns = ['lastname', 'firstname', 'netto'];

  headlines = {
    '21km': {
      M: 'Halbmarathon männlich',
      W: 'Halbmarathon weiblich',
    },
    '11km': {
      M: '11 km männlich',
      W: '11 km weiblich',
    },
    '7km': {
      M: '6.5 km männlich',
      W: '6.5 km weiblich',
    },
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .topFinishers()
      .subscribe((finishers) => (this.finishers = finishers));
  }
}
