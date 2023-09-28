import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'listar-usuarios'},
  {
    path: 'listar-usuarios', pathMatch: 'full', component: ListarUsuariosComponent
  },
  {
    path: 'novo-usuario', pathMatch: 'full', component: NovoUsuarioComponent
  },
  {
    path: 'editar-usuario', pathMatch: 'full', component: EditarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
