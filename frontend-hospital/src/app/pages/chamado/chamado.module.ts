import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadoRoutingModule } from './chamado-routing.module';
import { ListarChamadosComponent } from './listar-chamados/listar-chamados.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NovoChamadoComponent } from './novo-chamado/novo-chamado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    ListarChamadosComponent,
    NovoChamadoComponent
  ],
  imports: [
    CommonModule,
    ChamadoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ]
})
export class ChamadoModule { }
