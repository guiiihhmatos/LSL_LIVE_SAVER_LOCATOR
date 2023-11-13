import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent {
  columnsUsuarios = ['id', 'nome', 'cpf', 'login', 'role', 'edit', 'delete'];

  usuarios: Usuario[] = [];
  tableUsuarios = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private usuarioService: UsuarioService, private rota: Router) {}

  ngOnInit(): void {
    this.getAllUsuarios(0, 5, 'id,asc');
  }
  ngAfterViewInit(): void {
    this.tableUsuarios.sort = this.sort;
    this.tableUsuarios.paginator = this.paginator;
  }

  getAllUsuarios(page: number, size: number, sort: string) {
    this.usuarioService.getAllUsuarios(page, size, sort).subscribe({
      next: (res: any) => {
        this.usuarios = res.content as Usuario[];
        this.usuarios.forEach( (usuario, i) => {
          if(usuario.role == 'USER_AMBULANCIA'){
            this.usuarios.splice(i,1);
          }
        })
        this.tableUsuarios = new MatTableDataSource<Usuario>(this.usuarios);
        this.tableUsuarios.sort = this.sort;
        this.tableUsuarios.paginator = this.paginator;
      },
    });
  }

  confirmDelete(usuario: Usuario) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja deletear o usuario?',
      html: `Nome: <strong>${usuario.nome}</strong> <br> Login: <strong>${usuario.login}</strong>`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Deletar',
    }).then((res) => {
      if (res.isConfirmed) this.deleteUsuario(usuario.id);
    });
  }

  deleteUsuario(idUsuario: number) {
    this.usuarioService.deleteUsuario(idUsuario).subscribe({
      next: (res) => {
        Swal.fire({icon: 'success', title: 'Usuário deletado com sucesso', timer: 3000, timerProgressBar: true})
        .then(()=> window.location.reload());
      },
      error: (err) => {
        Swal.fire({icon: 'error', title: 'Erro ao deletar usuário', text: err?.error?.message});
      }
    })
  }

  redirectEdit(usuario: Usuario) {
    this.rota.navigate(['usuarios/editar-usuario'], { state: { usuario } });
  }

  filterUsuario(value: string) {
    this.tableUsuarios.filter = value.trim().toLowerCase();
  }
}
