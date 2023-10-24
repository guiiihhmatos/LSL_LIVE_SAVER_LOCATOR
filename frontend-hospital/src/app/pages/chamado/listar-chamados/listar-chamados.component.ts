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

  columnsChamados = ['id','data', 'estado', 'ocorrencia', 'emergencia', 'view', 'edit', 'delete']
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

  redirectDetails(chamado: Chamado){
    console.log('detalhes do chamado', chamado);
  }

  redirectEdit(chamado: Chamado) {
    console.log('edit', chamado);
  }

  confirmDelete(chamado: Chamado) {
    console.log('confirmação de delete', chamado);
  }

  filterChamados(value: string) {
    this.tableChamados.filter = value.trim().toLowerCase();
  }
}
