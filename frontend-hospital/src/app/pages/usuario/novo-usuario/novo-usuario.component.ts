import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NovoUsuarioComponent {

  formUsuario: FormGroup
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private rota: Router ){
    this.formUsuario = fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      login: [null, [Validators.required]]
    })
  }

  validateForm(form: FormGroup){
    if(form.invalid){
      Swal.fire({icon: 'error', title: 'Peencha todos os campos'})
    } else {
      this.saveUsuario(form.value)
    }
  }

  saveUsuario(usuario: Usuario){
    this.usuarioService.saveUsuario(usuario).subscribe({
      next: (res) => {
        Swal.fire({icon: 'success', title: 'Usuário salvo com sucesso', timer: 3000, timerProgressBar: true})
        .then(() => this.rota.navigate(['../']));
      },
      error: (err) => {
        Swal.fire({icon: 'error', title: 'Erro ao salvar usuário', text: err.error.message});
      }
    })
  }
}
