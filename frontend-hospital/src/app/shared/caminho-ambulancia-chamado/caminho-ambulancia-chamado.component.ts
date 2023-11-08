import { Component, Input } from '@angular/core';
import { MapDirectionsService, MarkerClustererOptions } from '@angular/google-maps';

@Component({
  selector: 'app-caminho-ambulancia-chamado',
  templateUrl: './caminho-ambulancia-chamado.component.html',
  styleUrls: ['./caminho-ambulancia-chamado.component.scss']
})
export class CaminhoAmbulanciaChamadoComponent {

  @Input() height: string = '500px';
  @Input() width: string = '700px';
  @Input() localAmbulancia: {lat: number, lng: number} = {lat: -24.1132345, lng: -46.6937981}; //ponto A
  @Input() localHospital: {lat: number, lng: number} = {lat: -24.1241525, lng: -46.6868054}; //ponto B
  directionsResult: google.maps.DirectionsResult | undefined;

  duration: string = '0 minutos';

  marcador!: MarkerClustererOptions;

  constructor(private directionsService: MapDirectionsService, ){

  }
  ngOnInit(): void {
    this.getDirections(this.localAmbulancia, this.localHospital);
  }

  getDirections(from: google.maps.LatLngLiteral, to: google.maps.LatLngLiteral) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request).subscribe({
      next: (res) => {
        this.directionsResult = res.result;
        if(res.result?.routes[0].legs[0].duration?.text)
        this.duration = res.result?.routes[0].legs[0].duration?.text;
      }
    })
  }
}
