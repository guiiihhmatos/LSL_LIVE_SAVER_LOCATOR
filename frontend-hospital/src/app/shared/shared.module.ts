import { NgModule } from '@angular/core';
import { LocalizacaoAmbulanciaComponent } from './localizacao-ambulancia/localizacao-ambulancia.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CaminhoAmbulanciaChamadoComponent } from './caminho-ambulancia-chamado/caminho-ambulancia-chamado.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  declarations: [LocalizacaoAmbulanciaComponent, CaminhoAmbulanciaChamadoComponent],
  imports: [GoogleMapsModule, CommonModule, AsyncPipe],
  exports: [LocalizacaoAmbulanciaComponent],
})
export class SharedModule {}
