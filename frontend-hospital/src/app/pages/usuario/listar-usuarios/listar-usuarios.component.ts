import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from 'src/app/models/usuario.model';
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
  displayedColumns = ['col1', 'col2', 'col3', 'col4', 'edit', 'delete'];
  usuarios: Usuario[] = [];
  tableUsuarios = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private usuarioService: UsuarioService, private rota: Router) {}

  ngAfterViewInit(): void {
    this.getAllUsuarios();
    this.tableUsuarios.paginator = this.paginator;
    this.tableUsuarios.sort = this.sort;
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.tableUsuarios.data = usuarios;
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
