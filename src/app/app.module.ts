import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowTimeComponent } from './show-time/show-time.component';
import { ShowStartersComponent } from './show-starters/show-starters.component';
import { ShowFinishersComponent } from './show-finishers/show-finishers.component';
import { MonitorStartersComponent } from './monitor-starters/monitor-starters.component';
import { MonitorFinishersComponent } from './monitor-finishers/monitor-finishers.component';
import { SettingsComponent } from './settings/settings.component';
import { ShowTopFinishersComponent } from './show-top-finishers/show-top-finishers.component';
import { BlocksComponent } from './blocks/blocks.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowTimeComponent,
    ShowStartersComponent,
    ShowFinishersComponent,
    MonitorStartersComponent,
    MonitorFinishersComponent,
    SettingsComponent,
    ShowTopFinishersComponent,
    BlocksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
