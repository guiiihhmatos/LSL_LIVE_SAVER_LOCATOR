import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Motorista } from 'src/app/models/motorista/motorista.model';
import { MotoristaService } from 'src/app/services/motorista/motorista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logados',
  templateUrl: './logados.component.html',
  styleUrls: ['./logados.component.scss']
})
export class LogadosComponent {
  columnsMotorista = ['id', 'nome', 'cpf', 'login'];

  motorista: Motorista[] = [];
  tableMotorista = new MatTableDataSource<Motorista>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor
  (
    private motoristaService: MotoristaService,
    private rota: Router
  ) {}

  ngOnInit(): void {
    this.getAllmotoristaLogged();
  }
  ngAfterViewInit(): void {
    // this.tablemotorista.sort = this.sort;
    // this.tableMotorista.paginator = this.paginator;
  }

  getAllmotoristaLogged() {
    this.motoristaService.getAllMotoristaLogged().subscribe({
      next: (res) => {
        this.motorista = res
        // this.motorista.forEach( (motorista, i) => {
        //   if(motorista.role == 'USER_AMBULANCIA')
        //   {
        //     this.motorista.splice(i);
        //   }
        // })
        this.tableMotorista = new MatTableDataSource<Motorista>(this.motorista);
      },
    });
  }

  filterMotorista(value: string) {
    this.tableMotorista.filter = value.trim().toLowerCase();
  }

  // page(value: any) {
  //   this.pagination = {
  //     page: value.pageIndex,
  //     size: value.pageSize,
  //     sort: 'id'
  //   }

  //   this.getAllmotorista(this.pagination);
  // }
}
