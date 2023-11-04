import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chamado } from 'src/app/models/chamado/chamado.model';

@Component({
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.component.html',
  styleUrls: ['./detalhes-chamado.component.scss']
})
export class DetalhesChamadoComponent {

  passedChamado: Chamado;
  viewChamado: FormGroup;
  constructor(fb: FormBuilder){
    this.passedChamado = history.state.chamado || null;
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
    })
  }

  ngOnInit(): void {
    console.log(this.passedChamado)
  }

}
