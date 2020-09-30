import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerSettingsComponent } from './timer-settings/timer-settings.component';
import { ShowFinishersComponent } from './show-finishers/show-finishers.component';
import { ShowTimeComponent } from './show-time/show-time.component';
import { StartBlocksComponent } from './start-blocks/start-blocks.component';
import { MonitorFinishersComponent } from './monitor-finishers/monitor-finishers.component';
import { ShowTopFinishersComponent } from './show-top-finishers/show-top-finishers.component';

const routes: Routes = [
  {
    component: ShowTimeComponent,
    path: 'show-time',
  },
  {
    component: ShowFinishersComponent,
    path: 'show-finishers',
  },
  {
    component: ShowTopFinishersComponent,
    path: 'show-top-finishers',
  },
  {
    component: TimerSettingsComponent,
    path: 'timer-settings',
  },
  {
    component: StartBlocksComponent,
    path: 'start-blocks',
  },
  {
    component: MonitorFinishersComponent,
    path: 'monitor-finishers',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
