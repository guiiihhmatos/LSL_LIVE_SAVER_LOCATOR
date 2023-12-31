import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambulancia, EstadosAmbulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-ambulancia',
  templateUrl: './editar-ambulancia.component.html',
  styleUrls: ['./editar-ambulancia.component.scss']
})
export class EditarAmbulanciaComponent {
  formAmbulancia: FormGroup;
  passedAmbulancia: Ambulancia;
  constructor(
    private fb: FormBuilder,
    private ambulanciaService: AmbulanciaService,
    private rota: Router
  ){
    this.passedAmbulancia = history.state.ambulancia;

    this.formAmbulancia = fb.group({
      id: [null, [Validators.required]],
      placa: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      estadoAmbulancia: [EstadosAmbulancia[EstadosAmbulancia.DISPONIVEL], [Validators.required]],
    });

    this.setValues(this.passedAmbulancia);
  }

  setValues(ambulancia: Ambulancia){
    this.formAmbulancia.patchValue({
      id: ambulancia.id,
      placa: ambulancia.placa,
      latitude: ambulancia.latitude,
      longitude: ambulancia.longitude,
      estadoAmbulancia: ambulancia.estadoAmbulancia
    })
  }

  validateForm(form: FormGroup){
    if (form.invalid) {
      Swal.fire({ icon: 'error', title: 'Peencha todos os campos' });
    } else {
      this.editAmbulancia(form.value);
    }
  }

  editAmbulancia(ambulancia: Ambulancia) {
    this.ambulanciaService.editAmbulancia(ambulancia).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Ambulância editada com sucesso',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.rota.navigate(['../ambulancias']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao editar ambulância',
          text: err?.error?.message,
        });
      },
    })
  }
}
