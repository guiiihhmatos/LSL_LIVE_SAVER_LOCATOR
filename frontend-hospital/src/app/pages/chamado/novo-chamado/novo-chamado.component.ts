import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado, EstadosChamado, TiposEmergencia, formChamado } from 'src/app/models/chamado/chamado.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novo-chamado',
  templateUrl: './novo-chamado.component.html',
  styleUrls: ['./novo-chamado.component.scss']
})
export class NovoChamadoComponent {

  ambulanciasDisponiveis: Ambulancia[] = [];
  formChamado: FormGroup;
  ambulanciasSalvas: Ambulancia[] = [];
  tiposEmergencia: string[] = [];

  indis = 'indis';

  cep = 0;

  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadoService,
    private ambulanciaService : AmbulanciaService,
    private cepService : CepService,
    private rota: Router
  ) {
    this.formChamado = fb.group({
      ocorrencia: [null, [Validators.required]],
      estadoChamado: ["A_CAMINHO", [Validators.required]],
      localChamado: fb.group({
        endereco: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        numero: [null],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cep: [null, [Validators.required]]
      }),
      tipoEmergencia: ["", [Validators.required]],
      ambulanciasIds: ["", [Validators.required]],
    });
    for(let tipo in TiposEmergencia){
      if(isNaN(+tipo)){
        this.tiposEmergencia.push(tipo);
      }
    }


  }

  ngOnInit(): void {
    this.getAllAmbulanciasDisponiveis();

    this.formChamado.controls['ambulanciasIds'].valueChanges.subscribe(ambulancia => {
      if(!this.ambulanciasSalvas.includes(ambulancia)) this.ambulanciasSalvas.push(ambulancia);
    })
  }

  validateForm(form: FormGroup) {
    if (form.invalid) {
      Swal.fire({ icon: 'error', title: 'Peencha todos os campos' });
    } else {
      this.saveChamado(form.value);
    }
  }

  getAllAmbulanciasDisponiveis() {
    this.ambulanciaService.getAllAmbulanciasDisponiveis().subscribe({
      next: (ambulancias) => {
        this.ambulanciasDisponiveis = ambulancias;
      },
    });
  }

  saveChamado(chamado: formChamado) {
    let aux: number[] = [];
    this.ambulanciasSalvas.forEach(a => aux.push(a.id))
    chamado.ambulanciaIds = aux;
    this.chamadoService.saveChamado(chamado).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Chamado salvo com sucesso',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.rota.navigate(['../chamados']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar chamado',
          text: err?.error?.message,
        });
      },
    });
  }

  //------------- Método de busca de CEP e liberação de campos sem dados ----------------------
  getCep(cep: number) {
    let endereco = document.getElementById('endereco') as HTMLInputElement
    let bairro = document.getElementById('bairro') as HTMLInputElement

    this.cepService.getCep(this.cep).subscribe((value) => {
      const localChamado = {
        cep: this.cep,
        endereco: value.logradouro.slice(value.logradouro.indexOf(' ')).trim(),
        bairro: value.bairro,
        cidade: value.localidade,
        estado: value.uf
      };

      this.formChamado.patchValue({
        localChamado: localChamado,
      });

      if (value.bairro == null || value.bairro == '' || value.bairro == undefined) {
        bairro?.classList.remove('indis');
      } else {
        bairro?.classList.add('indis');
      }

      if (value.logradouro == null || value.logradouro == '' || value.logradouro == undefined ) {
        endereco?.classList.remove('indis');
      } else {
        endereco?.classList.add('indis');
      }


    });
  }

}
