import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadoRoutingModule } from './chamado-routing.module';
import { ListarChamadosComponent } from './listar-chamados/listar-chamados.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    ListarChamadosComponent
  ],
  imports: [
    CommonModule,
    ChamadoRoutingModule,
    MaterialModule
  ]
})
export class ChamadoModule { }
