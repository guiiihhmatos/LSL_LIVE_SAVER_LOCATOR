import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';

@Component({
  selector: 'app-localizar-ambulancia',
  templateUrl: './localizar-ambulancia.component.html',
  styleUrls: ['./localizar-ambulancia.component.scss']
})
export class LocalizarAmbulanciaComponent {

  idAmbulancia: number;
  ambulancia!: Ambulancia;
  ulitimaAtualizacao: string;
  requestAmbulancia: Subscription;

  constructor(private rotaAtual: ActivatedRoute, private ambulanciaService: AmbulanciaService) {
    this.idAmbulancia = Number(rotaAtual.snapshot.paramMap.get('idAmbulancia'));
    this.ulitimaAtualizacao =new Date().getHours().toString().padStart(2, "0") +"H"+ new Date().getMinutes().toString().padStart(2, "0");
    this.requestAmbulancia = this.getAmbulanciaById(this.idAmbulancia);
  }

  ngOnInit(): void {
    // setInterval(()=>{window.location.reload()}, 30000)
  }

  getAmbulanciaById(idAmbulancia: number){
    return this.ambulanciaService.getAmbulanciaById(idAmbulancia).subscribe({
      next: (res) => {
        this.ambulancia = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
