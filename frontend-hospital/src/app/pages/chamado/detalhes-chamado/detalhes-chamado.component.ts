import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado, EstadosChamado, TiposEmergencia } from 'src/app/models/chamado/chamado.model';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.component.html',
  styleUrls: ['./detalhes-chamado.component.scss']
})
export class DetalhesChamadoComponent {

  localHospital = environment.localHospital;
  passedChamado: Chamado;
  viewChamado: FormGroup;
  tiposEmergencia: string[] = [];
  estadosChamado: string[] = [];
  ambulanciasSalvas: Ambulancia[] = [];
  page: number = 1;
  tempoEstimado: string[] = [];
  ultimaAtualizacao: string;

  constructor(fb: FormBuilder, private rota: Router) {
    this.ultimaAtualizacao = new Date().getHours().toString().padStart(2, "0") +"H"+ new Date().getMinutes().toString().padStart(2, "0");
    this.passedChamado = history.state.chamado;
    this.viewChamado = fb.group({
      id: [null],
      ocorrencia: [null],
      estadoChamado: [null],
      localChamado: fb.group({
        endereco: [null],
        bairro: [null],
        numero: [null],
        cidade: [null],
        estado: [null],
        cep: [null]
      }),
      tipoEmergencia: [null],
      ambulancias: [null],
    });

    for (let tipo in TiposEmergencia) {
      if (isNaN(+tipo)) {
        this.tiposEmergencia.push(tipo);
      }
    }
    for (let estado in EstadosChamado) {
      if (isNaN(+estado)) {
        this.estadosChamado.push(estado);
      }
    }

    this.setValues(this.passedChamado);
  }

  ngOnInit(): void {
  }

  setTempoEstimado(event: string){
    if(this.passedChamado.estadoChamado.toString() == "A_CAMINHO"){
      this.tempoEstimado.push("Aguardando a ambulância retornar");
    } else if (this.passedChamado.estadoChamado.toString() == "RETORNANDO"){
      this.tempoEstimado.push(event);
    }
  }


  setValues(chamado: Chamado) {

    this.viewChamado.patchValue({
      id: chamado.id,
      ocorrencia: chamado.ocorrencia,
      estadoChamado: chamado.estadoChamado,
      localChamado: chamado.localChamado,
      tipoEmergencia: chamado.tipoEmergencia,
      ambulanciaIds: chamado.ambulancias
    });

  }

}
