import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista/motorista.model';
import { MotoristaService } from 'src/app/services/motorista/motorista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-motorista',
  templateUrl: './editar-motorista.component.html',
  styleUrls: ['./editar-motorista.component.scss']
})
export class EditarMotoristaComponent {

  formMotorista: FormGroup;
  passedMotorista: Motorista;
  constructor(
    private fb: FormBuilder,
    private MotoristaService: MotoristaService,
    private rota: Router
  ) {
    this.passedMotorista = history.state.Motorista;

    this.formMotorista = fb.group({
      id: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.setValues(this.passedMotorista);
  }

  setValues(Motorista: Motorista) {
    this.formMotorista.patchValue({
      id: Motorista.id,
      nome: Motorista.nome,
      cpf: Motorista.cpf,
      login: Motorista.login
    })
  }

  validateForm(form: FormGroup) {
    if (form.invalid) {
      Swal.fire({ icon: 'error', title: 'Peencha todos os campos' });
    } else {
      this.editMotorista(form.value);
    }
  }

  editMotorista(Motorista: Motorista) {
    this.MotoristaService.editMotorista(Motorista).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Motorista editado com sucesso',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.rota.navigate(['../Motoristas']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao editar motorista',
          text: err?.error?.message,
        });
      },
    });
  }
}
