import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Chamado } from 'src/app/models/chamado/chamado.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novo-chamado',
  templateUrl: './novo-chamado.component.html',
  styleUrls: ['./novo-chamado.component.scss']
})
export class NovoChamadoComponent {

  ambulancias: Ambulancia[] = [];
  formChamado: FormGroup;

  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadoService,
    private ambulanciaService : AmbulanciaService,
    private rota: Router
  ) {
    this.formChamado = fb.group({
      ocorrencia: [null, [Validators.required]],
      estadoChamado: ['A_CAMINHO', [Validators.required]],
      localChamado: fb.group({
        endereco: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        numero: [0, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cep: [null, [Validators.required]]
      }),
      tipoEmergencia: ['URGENTE', [Validators.required]],
      ambulancias: [null, [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.getAllAmbulanciasDisponiveis();
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
        this.ambulancias = ambulancias;
      },
    });
  }

  saveChamado(chamado: Chamado) {
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

}
