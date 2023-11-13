import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista/motorista.model';
import { MotoristaService } from 'src/app/services/motorista/motorista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-motorista',
  templateUrl: './listar-motorista.component.html',
  styleUrls: ['./listar-motorista.component.scss']
})
export class ListarMotoristaComponent {
  columnsMotorista = ['id', 'nome', 'cpf', 'login', 'edit', 'delete'];

  motorista: Motorista[] = [];
  tableMotorista = new MatTableDataSource<Motorista>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private motoristaService: MotoristaService, private rota: Router) {}

  ngOnInit(): void {
    this.getAllmotorista(0, 5, 'id,asc');
  }
  ngAfterViewInit(): void {
    // this.tablemotorista.sort = this.sort;
    this.tableMotorista.paginator = this.paginator;
  }

  getAllmotorista(page: number, size: number, sort: string) {
    this.motoristaService.getAllMotoristas(page, size, sort).subscribe({
      next: (res) => {
        this.motorista = res.content as Motorista[];
        this.motorista.forEach( (motorista, i) => {
          if(motorista.role == 'USER_AMBULANCIA')
          {
            this.motorista.splice(i);
          }
        })
        this.tableMotorista = new MatTableDataSource<Motorista>(this.motorista);
        this.tableMotorista.sort = this.sort;
        this.tableMotorista.paginator = this.paginator;
      },
    });
  }

  confirmDelete(Motorista: Motorista) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja deletear o Motorista?',
      html: `Nome: <strong>${Motorista.nome}</strong> <br> Login: <strong>${Motorista.login}</strong>`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Deletar',
    }).then((res) => {
      if (res.isConfirmed) this.deleteMotorista(Motorista.id);
    });
  }

  deleteMotorista(idMotorista: number) {
    this.motoristaService.deleteMotorista(idMotorista).subscribe({
      next: (res) => {
        Swal.fire({icon: 'success', title: 'Usuário deletado com sucesso', timer: 3000, timerProgressBar: true})
        .then(()=> window.location.reload());
      },
      error: (err) => {
        Swal.fire({icon: 'error', title: 'Erro ao deletar usuário', text: err?.error?.message});
      }
    })
  }

  redirectEdit(Motorista: Motorista) {
    this.rota.navigate(['motoristas/editar-motorista'], { state: { Motorista } });
  }

  filterMotorista(value: string) {
    this.tableMotorista.filter = value.trim().toLowerCase();
  }
}
