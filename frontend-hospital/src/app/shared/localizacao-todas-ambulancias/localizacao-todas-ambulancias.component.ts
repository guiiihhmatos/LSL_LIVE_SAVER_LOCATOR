import { Component, Input } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { Ambulancia, EstadosAmbulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';

interface AmbulanciaMarker {
  position: google.maps.LatLngLiteral;
  options: google.maps.MarkerOptions;
}

@Component({
  selector: 'app-localizacao-todas-ambulancias',
  templateUrl: './localizacao-todas-ambulancias.component.html',
  styleUrls: ['./localizacao-todas-ambulancias.component.scss']
})
export class LocalizacaoTodasAmbulanciasComponent {

  ambulancias: Ambulancia[] = [];
  loadingAmbulancias: boolean = false;
  centroMapa: google.maps.LatLngLiteral = {
    lat: -23.944534301757812,
    lng: -46.33644485473633
  };
  zoom = 12
  ambulanciasMarkers: AmbulanciaMarker[] = [];
  @Input() height: string = '500px';
  @Input() width: string = '700px';
  constructor(
    private ambulanciaService: AmbulanciaService
  ) {

  }

  ngOnInit(): void {
    this.getAllAmbulancias();
  }

  getAllAmbulancias() {

    this.loadingAmbulancias = true;
    this.ambulanciaService.getAllAmbulancias(0, 10000, "id").subscribe({
      next: (res) => {
        this.loadingAmbulancias = false;
        this.ambulancias = res.content;
        this.configureMarkers(this.ambulancias);
      },
      error: (err) => {
        this.loadingAmbulancias = false;
        console.error(err);
      }
    })
  }

  configureMarkers(ambulancias: Ambulancia[]) {

    ambulancias.forEach(ambulancia => {
      let icon = "";
      if (ambulancia.estadoAmbulancia == EstadosAmbulancia[EstadosAmbulancia.DISPONIVEL]) icon = "assets/image/disponivel.png";
      else if (ambulancia.estadoAmbulancia == EstadosAmbulancia[EstadosAmbulancia.INATIVO]) icon = "assets/image/inativa.png";
      else if (ambulancia.estadoAmbulancia == EstadosAmbulancia[EstadosAmbulancia.OCUPADO]) icon = "assets/image/ocupada.png";
      const marker: AmbulanciaMarker = {
        position: { lat: ambulancia.latitude, lng: ambulancia.longitude },
        options: {
          draggable: false,
          icon
        }
      }

      this.ambulanciasMarkers.push(marker);


    })
  }


}
