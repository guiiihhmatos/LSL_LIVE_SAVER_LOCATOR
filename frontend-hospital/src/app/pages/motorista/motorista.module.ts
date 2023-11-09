import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotoristaRoutingModule } from './motorista-routing.module';
import { EditarMotoristaComponent } from './editar-motorista/editar-motorista.component';
import { NovoMotoristaComponent } from './novo-motorista/novo-motorista.component';
import { ListarMotoristaComponent } from './listar-motorista/listar-motorista.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    EditarMotoristaComponent,
    NovoMotoristaComponent,
    ListarMotoristaComponent
  ],
  imports: [
    CommonModule,
    MotoristaRoutingModule,
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
export class MotoristaModule { }
