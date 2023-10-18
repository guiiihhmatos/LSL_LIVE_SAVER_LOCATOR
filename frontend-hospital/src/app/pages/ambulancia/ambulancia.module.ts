import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbulanciaRoutingModule } from './ambulancia-routing.module';
import { ListarAmbulanciasComponent } from './listar-ambulancias/listar-ambulancias.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EditarAmbulanciaComponent } from './editar-ambulancia/editar-ambulancia.component';
import { NovaAmbulanciaComponent } from './nova-ambulancia/nova-ambulancia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    ListarAmbulanciasComponent,
    EditarAmbulanciaComponent,
    NovaAmbulanciaComponent
  ],
  imports: [
    CommonModule,
    AmbulanciaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()]
})
export class AmbulanciaModule { }
