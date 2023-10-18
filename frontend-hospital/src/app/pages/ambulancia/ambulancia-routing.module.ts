import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAmbulanciasComponent } from './listar-ambulancias/listar-ambulancias.component';
import { NovaAmbulanciaComponent } from './nova-ambulancia/nova-ambulancia.component';
import { EditarAmbulanciaComponent } from './editar-ambulancia/editar-ambulancia.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'listar-ambulancias'},
  {
    path: 'listar-ambulancias',
    pathMatch: 'full',
    component: ListarAmbulanciasComponent,
  },
  {
    path: 'nova-ambulancia',
    pathMatch: 'full',
    component: NovaAmbulanciaComponent,
  },
  {
    path: 'editar-ambulancia',
    pathMatch: 'full',
    component: EditarAmbulanciaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbulanciaRoutingModule {}
