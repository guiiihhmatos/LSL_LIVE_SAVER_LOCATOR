import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ambulancia, EstadosAmbulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';

@Component({
  selector: 'app-localizar-ambulancia',
  templateUrl: './localizar-ambulancia.component.html',
  styleUrls: ['./localizar-ambulancia.component.scss']
})
export class LocalizarAmbulanciaComponent {

  idAmbulancia: number;
  ambulancia!: Ambulancia;
  ultimaAtualizacao: string;
  requestAmbulancia: Subscription;
  classEA: string = "";

  constructor(private rotaAtual: ActivatedRoute, private ambulanciaService: AmbulanciaService) {
    this.idAmbulancia = Number(rotaAtual.snapshot.paramMap.get('idAmbulancia'));
    this.ultimaAtualizacao =new Date().getHours().toString().padStart(2, "0") +"H"+ new Date().getMinutes().toString().padStart(2, "0");
    this.requestAmbulancia = this.getAmbulanciaById(this.idAmbulancia);
  }

  ngOnInit(): void {
    setInterval(()=>{window.location.reload()}, 30000)
  }

  getAmbulanciaById(idAmbulancia: number){
    return this.ambulanciaService.getAmbulanciaById(idAmbulancia).subscribe({
      next: (res) => {
        this.ambulancia = res;
        if(this.ambulancia.estadoAmbulancia == EstadosAmbulancia.DISPONIVEL){
          this.classEA = 'text-success';
        } else if (this.ambulancia.estadoAmbulancia == EstadosAmbulancia.INATIVO){
          this.classEA = 'text-danger';
        } else {
          this.classEA = 'text-warning'
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
