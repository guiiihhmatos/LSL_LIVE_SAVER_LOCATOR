import { LocalChamado } from './../../models/chamado/chamado.model';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado } from 'src/app/models/chamado/chamado.model';

@Component({
  selector: 'app-caminho-ambulancia-chamado',
  templateUrl: './caminho-ambulancia-chamado.component.html',
  styleUrls: ['./caminho-ambulancia-chamado.component.scss']
})
export class CaminhoAmbulanciaChamadoComponent {

  @Input() height: string = '500px';
  @Input() width: string = '700px';
  @Input() localHospital!: google.maps.LatLngLiteral //= {lat: -24.1241525, lng: -46.6868054}; //ponto B
  @Input() ambulancia!: Ambulancia;
  @Input() chamado!: Chamado;
  @Output() estimativaStr = new EventEmitter<string>();
  @Output() ultimaAtualizacao = new EventEmitter<string>();

  directionsResult: google.maps.DirectionsResult | undefined;
  directionsChamado: google.maps.DirectionsResult | undefined;
  options: google.maps.DirectionsRendererOptions = {
    suppressMarkers: true //remover marcadores padrão (A & B);
  }

  markerAmbulanciaClicked: boolean = false;
  markerHospitalClicked: boolean = false;
  markerAmbulancia!: google.maps.MarkerOptions;
  markerHospital!: google.maps.MarkerOptions;
  markerChamado!: google.maps.MarkerOptions;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  constructor(private directionsService: MapDirectionsService) {

  }
  ngOnInit(): void {
    this.getDirections({ lat: this.ambulancia.latitude, lng: this.ambulancia.longitude }, this.localHospital, {lat: this.chamado.localChamado.latitude, lng: this.chamado.localChamado.longitude});
  }

  getDirections(ambulancia: google.maps.LatLngLiteral, hospital: google.maps.LatLngLiteral, chamado: google.maps.LatLngLiteral) {
    const request: google.maps.DirectionsRequest = {
      origin: ambulancia,
      destination: hospital,
      travelMode: google.maps.TravelMode.DRIVING
    };

    const requestChamado: google.maps.DirectionsRequest = {
      origin: ambulancia,
      destination: chamado,
      travelMode: google.maps.TravelMode.DRIVING
    }


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

    this.directionsService.route(requestChamado).subscribe({
      next: (res) => {
        this.directionsChamado = res.result;
        this.markerChamado = {
          position: { lat: Number(chamado.lat), lng: Number(chamado.lng) },
          // icon: 'assets/image/mark-ambulance.png',
          clickable: true,
          title: 'ambulancia',
        };
      }
    })
  }

  showInfo(marker: MapMarker, markerName: string) {
    if (markerName == 'hospital') {
      this.infoWindow.options = {
        content: `
          <span class="Santa" class="m-0">Santa Casa da Misericórdia de Santos</span>
        `,
      }
    } else if (markerName == 'ambulancia') {
      let p1 = this.ambulancia.placa.slice(0,3);
      let p2 = this.ambulancia.placa.slice(3,7);
      let placa = p1+'-'+p2;
      this.infoWindow.options = {
        content: `
        <span class="m-0">Placa: <strong class="fw-bold"> ${placa}</strong></span><br>
        <span class="m-0">Motorista: <strong class="fw-bold">${this.ambulancia?.motorista?.nome || ''}</strong></span>
        `,
      }
    } else if (markerName == 'chamado') {
      this.infoWindow.options = {
        content: `
        <span class="m-0">${this.chamado.ocorrencia}</span>
        `,
      }
    }

    this.infoWindow.open(marker);
  }
}
