import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAmbulanciasComponent } from './listar-ambulancias/listar-ambulancias.component';
import { NovaAmbulanciaComponent } from './nova-ambulancia/nova-ambulancia.component';
import { EditarAmbulanciaComponent } from './editar-ambulancia/editar-ambulancia.component';
import { LocalizarAmbulanciaComponent } from './localizar-ambulancia/localizar-ambulancia.component';

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
  {
    path: 'localizar-ambulancia/:idAmbulancia',
    pathMatch: 'full',
    component: LocalizarAmbulanciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbulanciaRoutingModule {}
