import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private rota: Router) {
    this.formLogin = fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  validateForm(form: FormGroup) {
    if(form.invalid){
      Swal.fire({icon: 'error', title: 'Preencha todos os campos'})
    } else {
      this.login(form.value)
    }
  }

  login(login: {login: string, password: string}) {
    this.auth.login(login).subscribe({
      next: (res) => {
        this.rota.navigate(['']);
      },
      error: (err) => {
        if(err.status == 500)
        Swal.fire({icon: 'error', title: 'Erro ao realizar login', text: err?.error?.message})
      }
    })
  }

}
