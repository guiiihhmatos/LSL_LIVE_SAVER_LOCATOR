import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-localizacao-ambulancia',
  templateUrl: './localizacao-ambulancia.component.html',
  styleUrls: ['./localizacao-ambulancia.component.scss'],
})
export class LocalizacaoAmbulanciaComponent {
  display: any;
  marcadorAmbulancia!: google.maps.LatLngLiteral; //marcador da ambulancia
  centroMapa: google.maps.LatLngLiteral = {
    lat: -23.944534301757812,
    lng: -46.33644485473633
  }; // local onde o mapa estara centralizado

  zoom = 14;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() height: string = '500px';
  @Input() width: string = '700px';
  constructor() {

  }

  ngOnInit(): void {
    if(this.latitude && this.longitude){ //caso venha  posicao de ambulancia
      this.marcadorAmbulancia = {lat: this.latitude, lng: this.longitude}
      this.centroMapa = {lat: this.latitude, lng: this.longitude};
    }
  }
}
