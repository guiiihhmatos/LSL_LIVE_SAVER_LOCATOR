import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado/chamado.model';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.scss']
})
export class ListarChamadosComponent {

  columnsChamados = ['id',]
  chamados: Chamado[] = [];
  tableChamados: MatTableDataSource<Chamado> = new MatTableDataSource<Chamado>();
  constructor(private chamadoService: ChamadoService){

  }

  ngOnInit(): void {
    this.getAllChamados();
  }

  getAllChamados() {
    this.chamadoService.getAllChamados().subscribe({
      next: (res) => {
        this.chamados = res;
        this.tableChamados.data = this.chamados;
      }
    })
  }

  filterChamados(value: string) {
    this.tableChamados.filter = value.trim().toLowerCase();
  }
}
