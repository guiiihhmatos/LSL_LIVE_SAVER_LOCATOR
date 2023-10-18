import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbulanciaRoutingModule } from './ambulancia-routing.module';
import { ListarAmbulanciasComponent } from './listar-ambulancias/listar-ambulancias.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    ListarAmbulanciasComponent
  ],
  imports: [
    CommonModule,
    AmbulanciaRoutingModule,
    MaterialModule
  ]
})
export class AmbulanciaModule { }
