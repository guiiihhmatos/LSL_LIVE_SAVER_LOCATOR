import { NgModule } from '@angular/core';
import { LocalizacaoAmbulanciaComponent } from './localizacao-ambulancia/localizacao-ambulancia.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CaminhoAmbulanciaChamadoComponent } from './caminho-ambulancia-chamado/caminho-ambulancia-chamado.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LocalizacaoTodasAmbulanciasComponent } from './localizacao-todas-ambulancias/localizacao-todas-ambulancias.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [LocalizacaoAmbulanciaComponent, CaminhoAmbulanciaChamadoComponent, LocalizacaoTodasAmbulanciasComponent],
  imports: [GoogleMapsModule, CommonModule, AsyncPipe, MaterialModule],
  exports: [LocalizacaoAmbulanciaComponent, CaminhoAmbulanciaChamadoComponent, LocalizacaoTodasAmbulanciasComponent],
})
export class SharedModule { }
