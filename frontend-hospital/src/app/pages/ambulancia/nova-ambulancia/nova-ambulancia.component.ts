import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambulancia, EstadosAmbulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nova-ambulancia',
  templateUrl: './nova-ambulancia.component.html',
  styleUrls: ['./nova-ambulancia.component.scss'],
})
export class NovaAmbulanciaComponent {
  formAmbulancia: FormGroup;
  constructor(
    private fb: FormBuilder,
    private ambulanciaService: AmbulanciaService,
    private rota: Router
  ) {
    this.formAmbulancia = fb.group({
      placa: [null, [Validators.required], ],
      latitude: [0],
      longitude: [0],
      estadoAmbulancia: [EstadosAmbulancia[EstadosAmbulancia.DISPONIVEL]],
    });
  }

  validateForm(form: FormGroup){
    if (form.invalid) {
      Swal.fire({ icon: 'error', title: 'Peencha todos os campos' });
    } else {
      this.saveAmbulancia(form.value);
    }
  }

  saveAmbulancia(ambulancia: Ambulancia){
    this.ambulanciaService.saveAmbulancia(ambulancia).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Ambulância salva com sucesso',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.rota.navigate(['../ambulancias']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar ambulância',
          text: err?.error?.message,
        });
      }
    })
  }
}
