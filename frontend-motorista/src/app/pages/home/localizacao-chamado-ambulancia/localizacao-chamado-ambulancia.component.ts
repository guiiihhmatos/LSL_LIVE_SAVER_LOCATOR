import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado, EstadosChamado, TiposEmergencia } from 'src/app/models/chamado/chamado.model';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-localizacao-chamado-ambulancia',
  templateUrl: './localizacao-chamado-ambulancia.component.html',
  styleUrls: ['./localizacao-chamado-ambulancia.component.scss']
})
export class LocalizacaoChamadoAmbulanciaComponent {
  localHospital = environment.localHospital;
  passedChamado: Chamado;
  viewChamado: FormGroup;
  tiposEmergencia: string[] = [];
  estadosChamado: string[] = [];
  ambulanciasSalvas: Ambulancia[] = [];
  page: number = 1;
  tempoEstimado: string = "";
  ultimaAtualizacao: string;
  localizacaoAtual!: google.maps.LatLngLiteral;

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
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{ // callback de sucesso
          this.localizacaoAtual = {lat: position.coords.latitude, lng: position.coords.longitude}
      },
      function(error){ // callback de erro
        Swal.fire({icon: 'error', title: 'Verfique se a localização está permitida', text: error.message});
      });
  } else {
      Swal.fire({icon: 'error', title: 'Navegador não suporta Geolocalização!'});
  }
    /*
    ===========================
          APLICAR IFs NAS ROTAS DE ACORDO COM O ESTADO DO CHAMADO
    ===========================
    */
  }

  setTempoEstimado(event: string){
    this.tempoEstimado = event;
    // if(this.passedChamado.estadoChamado.toString() == "A_CAMINHO"){
    //   this.tempoEstimado.push("Aguardando a ambulância retornar");
    // } else if (this.passedChamado.estadoChamado.toString() == "RETORNANDO"){
    //   this.tempoEstimado.push(event);
    // }
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
