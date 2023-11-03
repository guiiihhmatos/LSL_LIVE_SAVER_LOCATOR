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

}
