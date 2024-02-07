import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarMotoristaComponent } from './editar-motorista/editar-motorista.component';
import { ListarMotoristaComponent } from './listar-motorista/listar-motorista.component';
import { NovoMotoristaComponent } from './novo-motorista/novo-motorista.component';
import { LogadosComponent } from './logados/logados.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'listar-motorista'},
  {
    path: 'listar-motorista', pathMatch: 'full', component: ListarMotoristaComponent
  },
  {
    path: 'novo-motorista', pathMatch: 'full', component: NovoMotoristaComponent
  },
  {
    path: 'editar-motorista', pathMatch: 'full', component: EditarMotoristaComponent
  },
  {
    path: 'logados', pathMatch: 'full', component: LogadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristaRoutingModule { }
