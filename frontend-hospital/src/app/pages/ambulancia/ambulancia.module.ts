import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbulanciaRoutingModule } from './ambulancia-routing.module';
import { ListarAmbulanciasComponent } from './listar-ambulancias/listar-ambulancias.component';


@NgModule({
  declarations: [
    ListarAmbulanciasComponent
  ],
  imports: [
    CommonModule,
    AmbulanciaRoutingModule
  ]
})
export class AmbulanciaModule { }
