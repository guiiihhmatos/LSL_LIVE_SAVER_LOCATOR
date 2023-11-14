import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaminhoChamadiAmbulanciaComponent } from './caminho-chamadi-ambulancia/caminho-chamadi-ambulancia.component';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    CaminhoChamadiAmbulanciaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule { }
