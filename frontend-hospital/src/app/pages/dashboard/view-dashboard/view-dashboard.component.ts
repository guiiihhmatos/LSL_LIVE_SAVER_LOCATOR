import { Ambulancia } from './../../../models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import { Component } from '@angular/core';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';
import { EstadosChamado } from 'src/app/models/chamado/chamado.model';
import { MapDirectionsService } from '@angular/google-maps';
import { environment } from 'src/environments/environments';
import { Motorista } from 'src/app/models/motorista/motorista.model';

interface EstimativaAmbulancia {
  placa: string,
  tempoEstimado: string,
  motorista: string,
  idChamado: number
}

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss']
})
export class ViewDashboardComponent {

  totalAmbulancia = [
    {
      'titulo': 'Ocupadas',
      'total': 0
    },
    {
      'titulo': 'Disponíveis',
      'total': 0
    },
    {
      'titulo': 'Inativas',
      'total': 0
    }
  ];

  totalChamado = [
    {
      'titulo': 'A Caminho',
      'total': 0
    },
    {
      'titulo': 'Retornando',
      'total': 0
    },
    {
      'titulo': 'Finalizados',
      'total': 0
    }
  ];

  ativo = 'ativo';
  inativo = 'inativo';

  flagDash = true

  estimativaAmbulancias: EstimativaAmbulancia[] = [];

  tempoMedio = 0
  totalChamados = 0
  horas = 0
  minutos = 0
  segundos = 0
  localHospital = environment.localHospital;
  ambulancias: Ambulancia[] = [];
  verMapa: boolean = false;
  mapaCarregado: boolean = false;

  constructor
    (
      private ambulanciaService: AmbulanciaService,
      private chamadoService: ChamadoService,
      private directionsService: MapDirectionsService
    ) {

  }

  ngOnInit(): void {
    this.getTotalAmbulanciasOcupadas();
    this.getTotalAmbulanciasDisponiveis();
    this.getTotalAmbulanciasInativas();
    this.getTotalACaminho();
    this.getTotalRetornando();
    this.getTotalFinalizados();
    this.getTempoMedioChamado();
    this.getChamadosRetornando();
    //this.ambulanciasFake.length = 0 // testar se for 0
  }

  onChangeDash(dash: string) {
    let ambulancia = document.getElementById('ambulancia') as HTMLInputElement
    let chamado = document.getElementById('chamado') as HTMLInputElement

    if (dash == 'ambulancia') {
      ambulancia?.classList.remove('inativo');
      ambulancia?.classList.add('ativo');
      chamado?.classList.remove('ativo');
      chamado?.classList.add('inativo');
      this.flagDash = true;
    }
    else {
      ambulancia?.classList.remove('ativo');
      ambulancia?.classList.add('inativo');
      chamado?.classList.remove('inativo');
      chamado?.classList.add('ativo');
      this.flagDash = false;
    }
  }

  // DASHBOARD AMBULÂNCIA

  getTotalAmbulanciasOcupadas() {
    return this.ambulanciaService.getTotalOcupadas().subscribe({
      next: (res) => {
        this.totalAmbulancia[0].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalAmbulanciasDisponiveis() {
    return this.ambulanciaService.getTotalDisponiveis().subscribe({
      next: (res) => {
        this.totalAmbulancia[1].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalAmbulanciasInativas() {
    return this.ambulanciaService.getTotalInativas().subscribe({
      next: (res) => {
        this.totalAmbulancia[2].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getChamadosRetornando() {
    this.chamadoService.getChamadosByEstado(EstadosChamado.RETORNANDO).subscribe({
      next: (res) => {
        let auxChamado: { ambulancia: Ambulancia, idChamado: number }[] = [];

        res.forEach(chamado => {
          chamado.ambulancias.forEach(ambulancia => {
            auxChamado.push({ ambulancia: ambulancia, idChamado: chamado.id });
          })
        })

        this.getTemposEstimados(auxChamado)

      },
      error: (err) => {
        console.error(err);

      }
    })
  }

  getTemposEstimados(chamados: { ambulancia: Ambulancia, idChamado: number }[]) {

    chamados.forEach(chamado => {
      const request: google.maps.DirectionsRequest = {
        origin: { lat: chamado.ambulancia.latitude, lng: chamado.ambulancia.longitude },
        destination: this.localHospital,
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(request).subscribe({
        next: (rota) => {
          //se possuir estimativa
          let strEstimativa = "";

          if (rota.result?.routes[0].legs[0].duration) {
            Number(rota.result?.routes[0].legs[0].duration.text.split(" ")[0]) <= 3 ?
              strEstimativa = "chegando" :
              strEstimativa = rota.result?.routes[0].legs[0].duration.text;

            const estimativa: EstimativaAmbulancia = {
              idChamado: chamado.idChamado,
              motorista: chamado.ambulancia?.motorista?.nome,
              placa: chamado.ambulancia.placa,
              tempoEstimado: strEstimativa
            }
            this.estimativaAmbulancias.push(estimativa);
          }
        },
        error: (err) => {
          console.error(err);

        }
      });

      this.estimativaAmbulancias.push()
    })



  }

  // DASHBOARD CHAMADO

  getTotalACaminho() {
    return this.chamadoService.getTotalACaminho().subscribe({
      next: (res) => {
        this.totalChamado[0].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalRetornando() {
    return this.chamadoService.getTotalRetornando().subscribe({
      next: (res) => {
        this.totalChamado[1].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalFinalizados() {
    return this.chamadoService.getTotalFinalizados().subscribe({
      next: (res) => {
        this.totalChamado[2].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTempoMedioChamado() {

    return this.chamadoService.getTempoMedio().subscribe({
      next: (res) => {
        this.tempoMedio = res.tempoMedioMili
        this.totalChamados = res.qtdeChamados

        this.segundos = Math.floor(this.tempoMedio / 1000);

        if (this.segundos >= 60) {
          this.minutos = Math.floor(this.segundos / 60)
          this.segundos %= 60
        }

        if (this.minutos >= 60) {
          this.horas = Math.floor(this.minutos / 60);
          this.minutos %= 60;
        }

      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getAllAmbulancias(){
    this.mapaCarregado = false;
    this.ambulanciaService.getAllAmbulancias(1, 9000, "id").subscribe({
      next: (res) =>{
        this.mapaCarregado = true;
        this.ambulancias = res.content;
      },
      error: (err) => {
        this.mapaCarregado = true;
        console.error(err);
      }
    })
  }


  // ALTERAR A BORDA DO DASHBOARD
  getBorderColorClass(res: string) {
    if (res == 'Ocupadas') {
      return 'border-left-amarela';
    } else if (res == 'Inativas') {
      return 'border-left-vermelho';
    } else {
      return 'border-left-verde';
    }
  }

  getAmbulancias() {

  }


}
