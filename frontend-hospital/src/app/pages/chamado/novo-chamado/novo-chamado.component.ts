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
      if(!this.ambulanciasSalvas.includes(ambulancia) && ambulancia != '') this.ambulanciasSalvas.push(ambulancia);
    })
  }

  removerAmbulancia(ambulancia: Ambulancia){
    this.formChamado.patchValue({ambulanciasIds: ''});
    this.ambulanciasSalvas.splice(this.ambulanciasSalvas.indexOf(ambulancia), 1);
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
    chamado.ambulanciasIds = aux;
    console.log(aux);

    // this.chamadoService.saveChamado(chamado).subscribe({
    //   next: (res) => {
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Chamado salvo com sucesso',
    //       timer: 3000,
    //       timerProgressBar: true,
    //     }).then(() => this.rota.navigate(['../chamados']));
    //   },
    //   error: (err) => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Erro ao salvar chamado',
    //       text: err?.error?.message,
    //     });
    //   },
    // });
  }

  getCep(cep: number) {
    this.cepService.getCep(cep).subscribe((value) => {
      const localChamado = {
        cep: cep,
        endereco: value.logradouro.slice(value.logradouro.indexOf(' ')).trim(),
        bairro: value.bairro,
        cidade: value.localidade,
        estado: value.uf
      };

      this.formChamado.patchValue({
        localChamado: localChamado,
      });



    });
  }

}
