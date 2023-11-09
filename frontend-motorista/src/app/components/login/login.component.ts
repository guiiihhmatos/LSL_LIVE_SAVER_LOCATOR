import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;
  loadingSubmit: boolean = false;
  ambulanciasDisponiveis: Ambulancia[] = [];

  constructor
  (
    private fb: FormBuilder,
    private auth: AuthService,
    private rota: Router,
    private ambulanciaService: AmbulanciaService
  ) {
    this.formLogin = fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      //idAmbulancia: [1, [Validators.required]],
      idAmbulancia: [1]
    })

  }

  ngOnInit()
  {
    this.getAllAmbulanciasDisponiveis()
  }

  validateForm(form: FormGroup) {
    if(form.invalid){
      Swal.fire({icon: 'error', title: 'Preencha todos os campos'})
    } else {
      this.login(form.value)
    }
  }

  login(login: {login: string, password: string}) {
    this.loadingSubmit = true;
    this.auth.login(login).subscribe({
      next: (res) => {
        this.loadingSubmit = false;
        this.rota.navigate(['']);
      },
      error: (err) => {
        this.loadingSubmit = false;
        if(err.status == 500)
        Swal.fire({icon: 'error', title: 'Erro ao realizar login', text: err?.error?.message})
      }
    })
  }

  getAllAmbulanciasDisponiveis() {
    this.ambulanciaService.getAllAmbulanciasDisponiveis().subscribe({
      next: (ambulancias) => {
        this.ambulanciasDisponiveis = ambulancias;
      },
    });
  }
}
