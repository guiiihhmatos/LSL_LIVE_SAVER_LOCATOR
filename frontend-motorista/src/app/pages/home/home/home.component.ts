import { NotificacoesService } from './../../../services/notificacoes/notificacoes.service';
import { EstadosChamado } from './../../../../../../frontend-hospital/src/app/models/chamado/chamado.model';
import { Component } from '@angular/core';
import { Chamado, TiposEmergencia } from 'src/app/models/chamado/chamado.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';
import { Motorista } from '../../../../../../frontend-hospital/src/app/models/motorista/motorista.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  chamados: Chamado[] = [];
  idMotorista : number
  motorista : Motorista
  class = 'tipo'

  private destroy$: Subject<void> = new Subject<void>();

  constructor
  (
    private chamadoService : ChamadoService,
    private authService : AuthService,
    private rota: Router,
    private notificacaoService  : NotificacoesService
  )
  {
    this.motorista = authService.getUser
    this.idMotorista = this.motorista.id
  }

  ngOnInit() {
    this.checkAndFetchChamados();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkAndFetchChamados() {
    if (this.chamados.length === 0) {
      this.getAllChamados(this.idMotorista);
    }

    setTimeout(() => {
      if (!this.destroy$.isStopped) {
        this.checkAndFetchChamados();
      }
    }, 10000);
  }

  getAllChamados(id: number) {
    this.chamadoService.getChamadoByMotorista(id).subscribe({
      next: (res: any) => {
        this.chamados = res;
      }
    });
  }


  setClass(tipoEmergencia: string){
    if(tipoEmergencia === 'GRAVE') return 'tipo font-tipo-red'
    else if (tipoEmergencia === "MUITO_URGENTE") return 'tipo font-tipo-orange'
    return 'tipo font-tipo-yellow'
  }

  retornando(chamado: Chamado){
    let obj = {id: chamado.id, estadoChamado: EstadosChamado[EstadosChamado.RETORNANDO]};
    this.chamadoService.alteraEstadoChamado(obj).subscribe({
      next: (res) => {
        Swal.fire({title: 'Retornando ao hospital', timer: 3000, timerProgressBar: true})//.then(() => window.location.reload())
        this.notificacaoService.criarNotificacao(`Chamado - ${chamado.id.toString().padStart(4, "0")}. Ambulância retornando ao hospital.`).subscribe({
          next: () => {
            console.log('ok')
          },
          error: (err) => {
            console.error(err);
          }
        })
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  finalizarChamado(chamado : Chamado)
  {
    let obj = {
      id : chamado.id,
      estadoChamado : EstadosChamado[EstadosChamado.FINALIZADO]
    }
    Swal.fire({
      icon: 'warning',
      title: 'Deseja finalizar o chamado?',
      confirmButtonText: 'Finalizar',
      showDenyButton: true,
      denyButtonText: 'Não finalizar',
      confirmButtonColor: '#90ee90'
    }).then((res)=> {

      if(res.isConfirmed)
      {
        this.chamadoService.alteraEstadoChamado(obj).subscribe(
          {
            next: () => {

              this.notificacaoService.criarNotificacao(`Chamado - ${chamado.id.toString().padStart(4, "0")} foi finalizado.`).subscribe({
                next: () => {
                  console.log('ok')
                },
                error: (err) => {
                  console.error(err);
                }})

              Swal.fire({
                icon: 'success',
                title: 'Chamado finalizado com sucesso',
                timer: 3000,
                timerProgressBar: true,
              })

              //window.location.reload()

            }, error: (x) => {
              Swal.fire({
                icon: 'error',
                title: 'Erro ao finalizar chamado',
                text: x?.error?.message
              })
            }
          }
        )
      }



    });
  }

  redirectToLocation(chamado: Chamado) {
    this.rota.navigate(['home/localizacao'], {state: {chamado}})
  }

}
