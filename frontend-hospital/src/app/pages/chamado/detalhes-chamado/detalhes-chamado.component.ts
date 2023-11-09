import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado, EstadosChamado, TiposEmergencia } from 'src/app/models/chamado/chamado.model';

@Component({
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.component.html',
  styleUrls: ['./detalhes-chamado.component.scss']
})
export class DetalhesChamadoComponent {

  passedChamado: Chamado;
  viewChamado: FormGroup;
  tiposEmergencia: string[] = [];
  estadosChamado: string[] = [];
  ambulanciasSalvas: Ambulancia[] = [];
  page: number = 2;

  constructor(fb: FormBuilder){
    this.passedChamado = history.state.chamado;
    this.viewChamado = fb.group({
      id:[null],
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

    for(let tipo in TiposEmergencia){
      if(isNaN(+tipo)){
        this.tiposEmergencia.push(tipo);
      }
    }
    for(let estado in EstadosChamado){
      if(isNaN(+estado)){
        this.estadosChamado.push(estado);
      }
    }

    this.setValues(this.passedChamado);
  }

  ngOnInit(): void {

  }

  setValues(chamado: Chamado){

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
