import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadoRoutingModule } from './chamado-routing.module';
import { ListarChamadosComponent } from './listar-chamados/listar-chamados.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NovoChamadoComponent } from './novo-chamado/novo-chamado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { EditarChamadoComponent } from './editar-chamado/editar-chamado.component';
import { DetalhesChamadoComponent } from './detalhes-chamado/detalhes-chamado.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListarChamadosComponent,
    NovoChamadoComponent,
    EditarChamadoComponent,
    DetalhesChamadoComponent
  ],
  imports: [
    CommonModule,
    ChamadoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    provideNgxMask()
  ]
})
export class ChamadoModule { }
