import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocalizacaoChamadoAmbulanciaComponent } from './localizacao-chamado-ambulancia/localizacao-chamado-ambulancia.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'localizacao', pathMatch: 'full', component: LocalizacaoChamadoAmbulanciaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
