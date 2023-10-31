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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
  (
    private chamadoService: ChamadoService,
    private rota: Router
  ) {}

  ngOnInit(): void {
    this.getAllChamados(1, 5, 'ocorrencia,asc');
  }

  ngAfterViewInit() {
    // Conecte o paginator e sort ao MatTableDataSource
    this.tableChamados.paginator = this.paginator;
    this.tableChamados.sort = this.sort;
  }

  // No seu componente Angular
  getAllChamados(page: number, size: number, sort: string) {
    this.chamadoService.getAllChamados(page, size, sort).subscribe({
    next: (res: any) => {
      this.chamados = res.content;
      this.tableChamados.data = this.chamados;
      console.log(this.chamados);
      console.log(this.tableChamados.data);
    }
  });
}


  redirectDetails(chamado: Chamado) {
    console.log('detalhes do chamado', chamado);
  }

  redirectEdit(chamado: Chamado) {
    this.rota.navigate(['chamados/editar-chamado'], { state: { chamado } });
  }

  filterChamados(value: string) {
    this.tableChamados.filter = value.trim().toLowerCase();
  }
}
