import { NgModule } from '@angular/core';
import { LocalizacaoAmbulanciaComponent } from './localizacao-ambulancia/localizacao-ambulancia.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [LocalizacaoAmbulanciaComponent],
  imports: [GoogleMapsModule],
  exports: [LocalizacaoAmbulanciaComponent],
})
export class SharedModule {}
