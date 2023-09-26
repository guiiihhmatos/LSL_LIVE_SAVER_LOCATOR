import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAmbulanciasComponent } from './listar-ambulancias/listar-ambulancias.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'listar-ambulancias'},
  {
    path: 'listar-ambulancias',
    pathMatch: 'full',
    component: ListarAmbulanciasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbulanciaRoutingModule {}
