import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import { Component } from '@angular/core';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';

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

  ambulanciasFake = [
    {
      'placa': 'GBD-1029',
      'tempoEstimado': '30',
      'motorista' : 'guilherme',
      'chamado': '2932'
    },
    {
      'placa': 'SAS-4043',
      'tempoEstimado': '10',
      'motorista' : 'marcelo',
      'chamado': '2933'
    },
    {
      'placa': 'VSA-8542',
      'tempoEstimado': '09',
      'motorista' : 'caio',
      'chamado': '2934'
    },
    {
      'placa': 'NHM-9012',
      'tempoEstimado': '12',
      'motorista' : 'gustavo',
      'chamado': '2935'
    },
    {
      'placa': 'CUA-0190',
      'tempoEstimado': '13',
      'motorista' : 'ricardo',
      'chamado': '2939'
    }
  ]

  constructor
  (
    private ambulanciaService: AmbulanciaService,
    private chamadoService : ChamadoService
  )
  {

  }

  ngOnInit(): void {
    this.getTotalAmbulanciasOcupadas()
    this.getTotalAmbulanciasDisponiveis()
    this.getTotalAmbulanciasInativas()
    this.getTotalACaminho()
    this.getTotalRetornando()
    this.getTotalFinalizados()

    //this.ambulanciasFake.length = 0 // testar se for 0
  }

  onChangeDash(dash: string)
  {
    let ambulancia = document.getElementById('ambulancia') as HTMLInputElement
    let chamado = document.getElementById('chamado') as HTMLInputElement

    if(dash == 'ambulancia')
    {
      ambulancia?.classList.remove('inativo');
      ambulancia?.classList.add('ativo');
      chamado?.classList.remove('ativo');
      chamado?.classList.add('inativo');
      this.flagDash = true;
    }
    else
    {
      ambulancia?.classList.remove('ativo');
      ambulancia?.classList.add('inativo');
      chamado?.classList.remove('inativo');
      chamado?.classList.add('ativo');
      this.flagDash = false;
    }
  }

  // DASHBOARD AMBULÂNCIA

  getTotalAmbulanciasOcupadas(){
    return this.ambulanciaService.getTotalOcupadas().subscribe({
      next: (res) => {
        this.totalAmbulancia[0].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalAmbulanciasDisponiveis(){
    return this.ambulanciaService.getTotalDisponiveis().subscribe({
      next: (res) => {
        this.totalAmbulancia[1].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalAmbulanciasInativas(){
    return this.ambulanciaService.getTotalInativas().subscribe({
      next: (res) => {
        this.totalAmbulancia[2].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  // DASHBOARD CHAMADO

  getTotalACaminho(){
    return this.chamadoService.getTotalACaminho().subscribe({
      next: (res) => {
        this.totalChamado[0].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalRetornando(){
    return this.chamadoService.getTotalRetornando().subscribe({
      next: (res) => {
        this.totalChamado[1].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getTotalFinalizados(){
    return this.chamadoService.getTotalFinalizados().subscribe({
      next: (res) => {
        this.totalChamado[2].total = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  // ALTERAR A BORDA DO DASHBOARD
  getBorderColorClass(res : string) {
    if (res == 'Ocupadas') {
      return 'border-left-amarela';
    } else if (res == 'Inativas') {
      return 'border-left-vermelho';
    } else {
      return 'border-left-verde';
    }
  }


}
