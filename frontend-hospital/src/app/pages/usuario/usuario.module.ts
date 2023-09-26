import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    ListarUsuariosComponent,
    NovoUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
