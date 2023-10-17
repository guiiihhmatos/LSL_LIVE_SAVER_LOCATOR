import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  formUsuario: FormGroup;
  passedUsuario: Usuario;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rota: Router
  ) {
    this.passedUsuario = history.state.usuario;

    this.formUsuario = fb.group({
      id: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: ['', [Validators.required]]
    });

    this.setValues(this.passedUsuario);
  }

  setValues(usuario: Usuario) {
    this.formUsuario.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      login: usuario.login,
      role: usuario.role
    })
  }

  validateForm(form: FormGroup) {
    if (form.invalid) {
      Swal.fire({ icon: 'error', title: 'Peencha todos os campos' });
    } else {
      this.editUsuario(form.value);
    }
  }

  editUsuario(usuario: Usuario) {
    this.usuarioService.editUsuario(usuario).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuário editado com sucesso',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => this.rota.navigate(['../']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao editar usuário',
          text: err?.error?.message,
        });
      },
    });
  }
}
