import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { AmbulanciaService } from 'src/app/services/ambulancia/ambulancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-ambulancias',
  templateUrl: './listar-ambulancias.component.html',
  styleUrls: ['./listar-ambulancias.component.scss']
})
export class ListarAmbulanciasComponent {
  columnsAmbulancias = ['id', 'placa','estado', 'localizacao', 'edit'];

  ambulancias: Ambulancia[] = [];
  tableAmbulancias = new MatTableDataSource<Ambulancia>();
  pagination = {
    page: 0,
    size: 5,
    sort: "id",
  };
  pageAtual = this.pagination.page;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private ambulanciaService: AmbulanciaService, private rota: Router) {}

  ngOnInit(): void {
    this.getAllAmbulancias(this.pagination);
  }
  ngAfterViewInit(): void {

  }

  getAllAmbulancias({page, size, sort}:{page: number, size: number, sort: string}) {
    this.ambulanciaService.getAllAmbulancias(page, size, sort).subscribe({
      next: (res) => {
        this.ambulancias = res.content as Ambulancia[];
        this.tableAmbulancias = new MatTableDataSource<Ambulancia>(this.ambulancias);
        this.tableAmbulancias.sort = this.sort;
        this.paginator.pageIndex = res.number;
        this.paginator.pageSize = res.size;
        this.paginator.length = res.totalElements;
      },
    });
  }

  redirectEdit(ambulancia: Ambulancia) {
    this.rota.navigate(['ambulancias/editar-ambulancia'], { state: { ambulancia } });
  }

  redirectLocalAmbulancia(ambulancia: Ambulancia) {
    this.rota.navigate(['ambulancias/localizar-ambulancia/', ambulancia.id], {state: {ambulancia}})
  }

  filterAmbulancia(value: string) {
    this.tableAmbulancias.filter = value.trim().toLowerCase();
  }

  setClass(estado: string){
    if(estado == "DISPONIVEL"){
      return 'text-success';
    } else if (estado == "INATIVO"){
      return 'text-danger';
    } else {
      return 'text-warning'
    }
  }

  alterarEstado(ambulancia: Ambulancia){
    const patch = {
      id: ambulancia.id,
      estadoAmbulancia: ambulancia.estadoAmbulancia
    }
    console.log(patch)

    //criar um select para escolher o estado no swal
    // Swal.fire({icon: 'warning', title:})

    // this.ambulanciaService.alterarEstadoAmbulancia(patch).subscribe({
    //   next: (res) => {
    //     Swal.fire({icon: 'success', title: 'Estado da ambulância alterado com sucesso', timer: 3000, timerProgressBar: true})
    //     .then(()=> window.location.reload);
    //   }
    // })
  }

  page(value: any) {
    this.pagination = {
      page: value.pageIndex,
      size: value.pageSize,
      sort: 'id'
    }

    this.getAllAmbulancias(this.pagination);
  }
}
