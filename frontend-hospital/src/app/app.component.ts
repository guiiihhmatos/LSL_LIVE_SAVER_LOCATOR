import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-hospital';

  constructor(private auth: AuthService) { }

  get logado() {
    return this.auth.getUser;
  }

  ngOnInit(): void {
    // Pontos de início e final
    const pontoInicio = { lat: -24.1256331, long: -46.6876509 }; // Nova York, EUA
    const pontoFinal = { lat: -24.1162005, long: -46.6929348 }; // Los Angeles, EUA

    // Criar a rota com 10 pontos entre o ponto de início e o ponto final
    const rota = this.criarRotaEntrePontos(pontoInicio, pontoFinal, 10);

    // Exibir a rota
    // console.log(rota);
  }

  criarRotaEntrePontos(pontoInicio: { lat: number, long: number }, pontoFinal: { lat: number, long: number }, numeroDePontos: number) {
    const rota = [];

    for (let i = 0; i < numeroDePontos; i++) {
      const progresso = i / (numeroDePontos - 1);
      const lat = pontoInicio.lat + (pontoFinal.lat - pontoInicio.lat) * progresso;
      const long = pontoInicio.long + (pontoFinal.long - pontoInicio.long) * progresso;

      rota.push({ lat, long });
    }

    return rota;
  }


}
