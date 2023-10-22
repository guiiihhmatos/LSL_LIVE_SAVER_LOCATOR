import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarChamadosComponent } from './listar-chamados/listar-chamados.component';
import { NovoChamadoComponent } from './novo-chamado/novo-chamado.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar-chamados' },
  {
    path: 'listar-chamados',
    pathMatch: 'full',
    component: ListarChamadosComponent,
  },
  {
    path: 'novo-chamado',
    pathMatch: 'full',
    component: NovoChamadoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChamadoRoutingModule {}
