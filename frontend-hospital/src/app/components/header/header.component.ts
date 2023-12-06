import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Notificacao } from 'src/app/models/notificacao/notificacao.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificacoesService } from 'src/app/services/notificacoes/notificacoes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  usuario: Usuario;
  panelOpenState = false;

  qtdeNotificacoes = 0;
  notificacao: Notificacao[] = [];

  valNotificacao = false

  private destroy$: Subject<void> = new Subject<void>();

  constructor
  (
    private auth: AuthService,
    private notificacaoService : NotificacoesService,
    private rota: Router
  ){
    this.usuario = auth.getUser;
  }

  ngOnInit() {
    this.getAllNotificacoes()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  getAllNotificacoes()
  {

    this.notificacaoService.getNotificacoesNaoLidas().subscribe({

        next: (res: any) => {

          if(res.lenght >= 3)
          {
            for(let i = 0; i < 3; i++)
            {
              this.notificacao[i] = res[i];
            }
          }
          else
          {
            this.notificacao = res;
          }


          this.qtdeNotificacoes = res.length;

          setTimeout(() => {
            if (!this.destroy$.isStopped) {
              this.getAllNotificacoes();
            }
          }, 10000);

        }

      }
    )
  }

  logout(){
    this.auth.logout();
  }

  viewNotificacao()
  {
    if(this.valNotificacao)
    {
      this.valNotificacao = false
    } else {
      this.valNotificacao = true
    }
  }

  marcarComoLida(id : number)
  {
    this.notificacaoService.marcarComoLida(id).subscribe({
      next: () => {
        this.getAllNotificacoes();
      }
    })
  }

  redirectNotificacao() {
    this.rota.navigate(['notificacao']);
  }

}
