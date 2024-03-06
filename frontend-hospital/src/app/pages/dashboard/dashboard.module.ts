import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    ViewDashboardComponent
  ],
  providers: [provideNgxMask()],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ]
})
export class DashboardModule { }
