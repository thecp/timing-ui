import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatDrawer;

  title = 'timing-ui';

  links: [link: string, label: string][] = [
    ['show-time', 'Zeit anzeigen'],
    ['timer-settings', 'Timer-Einstellungen'],
    ['start-blocks', 'Blöcke starten'],
    ['monitor-finishers', 'Finisher überwachen'],
    ['show-finishers', 'Finisher anzeigen'],
    ['show-top-finishers', 'Top Finisher anzeigen'],
  ];

  constructor() {}
}
