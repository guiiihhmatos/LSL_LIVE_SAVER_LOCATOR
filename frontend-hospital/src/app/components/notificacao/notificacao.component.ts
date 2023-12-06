import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Notificacao } from 'src/app/models/notificacao/notificacao.model';
import { NotificacoesService } from 'src/app/services/notificacoes/notificacoes.service';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent {
  columnsNotificacao = ['id', 'mensagem', 'data'];
  notificacao: Notificacao[] = [];
  tableNotificacao: MatTableDataSource<Notificacao> = new MatTableDataSource<Notificacao>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
    (
      private notificacaoService: NotificacoesService,
      private location: Location
    ) { }

  ngOnInit(): void {
    this.getAllNotificacao();
  }

  getAllNotificacao() {
    this.notificacaoService.getNotificacoesNaoLidas().subscribe({
      next: (res: any) => {
        this.notificacao = res
        this.tableNotificacao.data = this.notificacao

        console.log(this.notificacao)
      }
    });
  }

  filterNotificacao(value: string) {
  }

  onBack()
  {
    this.location.back()
  }

}
