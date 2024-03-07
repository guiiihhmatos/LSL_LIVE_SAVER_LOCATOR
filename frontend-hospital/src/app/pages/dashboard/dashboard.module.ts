import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


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
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
