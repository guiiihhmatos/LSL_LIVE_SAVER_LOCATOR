import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado/chamado.model';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.scss']
})
export class ListarChamadosComponent {

  columnsChamados = ['id', 'data', 'estado', 'ocorrencia', 'emergencia', 'view', 'edit'];
  chamados: Chamado[] = [];
  tableChamados: MatTableDataSource<Chamado> = new MatTableDataSource<Chamado>();
  pagination = {
    page: 0,
    size: 5,
    sort: "id",
  };
  pageAtual = this.pagination.page;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
    (
      private chamadoService: ChamadoService,
      private rota: Router
    ) { }

  ngOnInit(): void {
    this.getAllChamados(this.pagination);
  }

  ngAfterViewInit() {

  }

  getAllChamados({page, size, sort}:{page: number, size: number, sort: string}) {
    this.chamadoService.getAllChamados(page, size, sort).subscribe({
      next: (res: any) => {
        this.chamados = res.content as Chamado[];
        this.tableChamados.data = this.chamados;
        this.paginator.pageIndex = res.number;
        this.paginator.pageSize = res.size;
        this.paginator.length = res.totalElements;
      }
    });
  }


  redirectDetails(chamado: Chamado) {
    this.rota.navigate(['chamados/detalhes-chamado'], { state: { chamado } })
  }

  redirectEdit(chamado: Chamado) {
    this.rota.navigate(['chamados/editar-chamado'], { state: { chamado } });
  }

  filterChamados(value: string) {
    if(value == ""){
      this.getAllChamados(this.pagination);
      return;
    }
    this.chamadoService.filterChamado(value, this.pagination.page, this.pagination.size, this.pagination.sort).subscribe({
      next: (res: any) => {
        this.chamados = res.content as Chamado[];
        this.tableChamados = new MatTableDataSource<Chamado>(this.chamados);
        this.tableChamados.sort = this.sort;

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

    this.getAllChamados(this.pagination);
  }
}
