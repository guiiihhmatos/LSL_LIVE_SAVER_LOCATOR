import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'info'},
  {
    path: 'info', pathMatch: 'full', component: ViewDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
