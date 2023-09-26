import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent {

  displayedColumns = ['col1', 'col2', 'col3', 'col4', 'edit', 'delete'];
  usuarios: Usuario[] = [];
  tableUsuarios = new MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private usuarioService: UsuarioService){

  }

  ngAfterViewInit(): void {
    this.getAllUsuarios();
    this.tableUsuarios.paginator = this.paginator;
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.tableUsuarios.data = usuarios;
      }
    })
  }


}
