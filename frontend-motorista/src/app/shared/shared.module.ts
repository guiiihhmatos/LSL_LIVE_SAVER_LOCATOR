import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { CaminhoChamadoAmbulanciaComponent } from './caminho-chamado-ambulancia/caminho-chamado-ambulancia.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxMaskPipe } from 'ngx-mask';



@NgModule({
  declarations: [
    CaminhoChamadoAmbulanciaComponent
  ],
  imports: [
    CommonModule,
    AsyncPipe,
    GoogleMapsModule,
  ],
  exports: [
    MaterialModule,
    CaminhoChamadoAmbulanciaComponent
  ]
})
export class SharedModule { }
