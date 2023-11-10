import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';

@Component({
  selector: 'app-caminho-ambulancia-chamado',
  templateUrl: './caminho-ambulancia-chamado.component.html',
  styleUrls: ['./caminho-ambulancia-chamado.component.scss']
})
export class CaminhoAmbulanciaChamadoComponent {

  @Input() height: string = '500px';
  @Input() width: string = '700px';
  @Input() localHospital!: { lat: number, lng: number } //= {lat: -24.1241525, lng: -46.6868054}; //ponto B
  @Input() ambulancia!: Ambulancia;
  @Output() estimativaStr = new EventEmitter<string>();
  @Output() ultimaAtualizacao = new EventEmitter<string>();

  directionsResult: google.maps.DirectionsResult | undefined;
  options: google.maps.DirectionsRendererOptions = {
    suppressMarkers: true //remover marcadores padrão (A & B);
  }

  markerAmbulanciaClicked: boolean = false;
  markerHospitalClicked: boolean = false;
  markerAmbulancia!: google.maps.MarkerOptions;
  markerHospital!: google.maps.MarkerOptions;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  constructor(private directionsService: MapDirectionsService) {

  }
  ngOnInit(): void {
    this.getDirections({ lat: this.ambulancia.latitude, lng: this.ambulancia.longitude }, this.localHospital);
  }

  getDirections(from: google.maps.LatLngLiteral, to: google.maps.LatLngLiteral) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request).subscribe({
      next: (res) => {
        //aplica informações da localização dos pontos para marcadores personalizados
        let latA = Number(res.result?.routes[0].legs[0].start_location.lat()); //start posision
        let lngA = Number(res.result?.routes[0].legs[0].start_location.lng()); //start posision
        let latH = Number(res.result?.routes[0].legs[0].end_location.lat()); //end posision
        let lngH = Number(res.result?.routes[0].legs[0].end_location.lng()); //end posision
        this.markerAmbulancia = {
          position: { lat: latA, lng: lngA },
          icon: 'assets/image/mark-ambulance.png',
          clickable: true,
          title: 'ambulancia',
        };
        this.markerHospital = {
          position: { lat: latH, lng: lngH },
          icon: 'assets/image/mark-hospital.png',
          clickable: true,
          title: 'hospital'
        };

        this.directionsResult = res.result;

        //retornar estimativa no output
        if (res.result?.routes[0].legs[0].duration) {
          this.estimativaStr.emit(res.result?.routes[0].legs[0].duration.text);
        }
      }
    })
  }

  showInfo(marker: MapMarker, markerName: string) {
    if (markerName == 'hospital') {
      this.infoWindow.options = {
        content: `
          <h6 class="m-0">Dados do hospital</h6>
        `,
      }
    } else if (markerName == 'ambulancia') {
      this.infoWindow.options = {
        content: `
        <h6 class="m-0">Dados da ambulância
        `,
      }

    }

    this.infoWindow.open(
      marker
    )
  }
}
