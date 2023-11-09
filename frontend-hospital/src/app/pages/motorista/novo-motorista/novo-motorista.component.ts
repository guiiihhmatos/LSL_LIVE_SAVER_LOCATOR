import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista/motorista.model';
import { MotoristaService } from 'src/app/services/motorista/motorista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novo-motorista',
  templateUrl: './novo-motorista.component.html',
  styleUrls: ['./novo-motorista.component.scss']
})
export class NovoMotoristaComponent {
  formMotorista: FormGroup;
  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private rota: Router
  ) {
    this.formMotorista = fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  validateForm(form: FormGroup) {
    if (form.invalid) {
      Swal.fire({ icon: 'error', title: 'Peencha todos os campos' });
    } else {
      this.saveMotorista(form.value);
    }
  }

  saveMotorista(motorista: Motorista) {
    this.motoristaService.saveMotorista(motorista).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Motorista salvo com sucesso',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.rota.navigate(['../motoristas']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar usuário',
          text: err?.error?.message,
        });
      },
    });
  }
}
