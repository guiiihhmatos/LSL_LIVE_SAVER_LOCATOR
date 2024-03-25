import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado } from 'src/app/models/chamado/chamado.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caminho-chamado-ambulancia',
  templateUrl: './caminho-chamado-ambulancia.component.html',
  styleUrls: ['./caminho-chamado-ambulancia.component.scss']
})
export class CaminhoChamadoAmbulanciaComponent {
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
  markerFinal!: google.maps.MarkerOptions;
  markerChamado!: google.maps.MarkerOptions;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  constructor(private directionsService: MapDirectionsService, private ambulanciaService: AmbulanciaService) {

  }
  ngOnInit(): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { // callback de sucesso
        //localização atual na ambulânca
        const localizacaoAtual = { lat: position.coords.latitude, lng: position.coords.longitude }
        //enviar requisição post
        if (this.chamado.estadoChamado.toString() == "A_CAMINHO") {
          this.getDirections(localizacaoAtual, { lat: this.chamado.localChamado.latitude, lng: this.chamado.localChamado.longitude });
        } else {
          this.getDirections(localizacaoAtual, this.localHospital);
        }
      },
        function (error) { // callback de erro
          Swal.fire({ icon: 'error', title: 'Verfique se a localização está permitida', text: error.message });
        });
              //aplicar local atual em ambulância
    } else {
      Swal.fire({ icon: 'error', title: 'Navegador não suporta Geolocalização!' });
    }
  }

  getDirections(ambulancia: google.maps.LatLngLiteral, final: google.maps.LatLngLiteral) {

    const request: google.maps.DirectionsRequest = {
      origin: ambulancia,
      destination: final,
      travelMode: google.maps.TravelMode.DRIVING
    };

    // const requestChamado: google.maps.DirectionsRequest = {
    //   origin: ambulancia,
    //   destination: chamado,
    //   travelMode: google.maps.TravelMode.DRIVING
    // }


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
        this.markerFinal = {
          position: { lat: latH, lng: lngH },
          icon: this.chamado.estadoChamado.toString() == 'RETORNANDO' ? 'assets/image/mark-hospital.png' : null,
          clickable: true,
          title: 'hospital'
        };

        this.directionsResult = res.result;
        const distancia = res?.result?.routes[0].legs[0].distance?.value;
        const duracao = res.result?.routes[0].legs[0].duration;
        //retornar estimativa no output
        if (duracao) {
          if (distancia && distancia <= 1000) {
            this.estimativaStr.emit("Prómixo ao local");
          } else {
            this.estimativaStr.emit(duracao.text);
          }
        }

      }
    })

    // this.directionsService.route(requestChamado).subscribe({
    //   next: (res) => {
    //     this.directionsChamado = res.result;
    //     this.markerChamado = {
    //       position: { lat: Number(chamado.lat), lng: Number(chamado.lng) },
    //       clickable: true,
    //       title: 'ambulancia',
    //     };
    //     const distancia = res?.result?.routes[0].legs[0].distance?.value;

    //     if(distancia && distancia <= 500){
    //       this.estimativaStr.emit("Prómixo ao local");
    //     }
    //   }
    // })
  }

  showInfo(marker: MapMarker, markerName: string) {
    if (markerName == 'hospital') {
      this.infoWindow.options = {
        content: `
          <span class="Santa" class="m-0">Santa Casa da Misericórdia de Santos</span>
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
