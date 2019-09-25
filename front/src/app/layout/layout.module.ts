import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CoreModule, FlexLayoutModule} from '@angular/flex-layout';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import { PollComponent } from './poll/poll.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    PollComponent,
    DashboardComponent
  ],
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterModule,
    FlexLayoutModule,
    LayoutRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class LayoutModule { }
