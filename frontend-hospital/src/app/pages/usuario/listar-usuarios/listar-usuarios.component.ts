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
  pagination = {
    page: 0,
    size: 5,
    sort: "id",
  };
  pageAtual = this.pagination.page;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private usuarioService: UsuarioService, private rota: Router) {}

  ngOnInit(): void {
    this.getAllUsuarios(this.pagination);
  }
  ngAfterViewInit(): void {
    this.tableUsuarios.sort = this.sort;
    this.tableUsuarios.paginator = this.paginator;
  }

  getAllUsuarios({page, size, sort}:{page: number, size: number, sort: string}) {
    this.usuarioService.getAllUsuarios(page, size, sort).subscribe({
      next: (res: any) => {
        this.usuarios = res.content as Usuario[];
        this.tableUsuarios = new MatTableDataSource<Usuario>(this.usuarios);
        this.tableUsuarios.sort = this.sort;
        // this.tableUsuarios.paginator = this.paginator;
        this.paginator.pageIndex = res.number;
        this.paginator.pageSize = res.size;
        this.paginator.length = res.totalElements;
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
    if(value == ""){
      this.getAllUsuarios(this.pagination);
      return;
    }
    this.usuarioService.filterUsuario(value, this.pagination.page, this.pagination.size, this.pagination.sort).subscribe({
      next: (res: any) => {
        this.usuarios = res.content as Usuario[];
        this.tableUsuarios = new MatTableDataSource<Usuario>(this.usuarios);
        this.tableUsuarios.sort = this.sort;
        // this.tableUsuarios.paginator = this.paginator;


        this.paginator.pageIndex = res.number;
        this.paginator.pageSize = res.size;
        this.paginator.length = res.totalElements;
      }
    })
  }

  page(value: any) {
    this.pagination = {
      page: value.pageIndex,
      size: value.pageSize,
      sort: 'id'
    }

    this.getAllUsuarios(this.pagination);
  }
}
