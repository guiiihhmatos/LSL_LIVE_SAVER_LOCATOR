import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import { Component } from '@angular/core';

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

  constructor
  (
    private ambulanciaService: AmbulanciaService
  )
  {

  }

  ngOnInit(): void {
    this.getTotalAmbulanciasOcupadas()
    this.getTotalAmbulanciasDisponiveis()
    this.getTotalAmbulanciasInativas()
  }

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

}
