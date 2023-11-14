import { EstadosChamado } from './../../../../../../frontend-hospital/src/app/models/chamado/chamado.model';
import { Component } from '@angular/core';
import { Chamado, TiposEmergencia } from 'src/app/models/chamado/chamado.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';
import { Motorista } from '../../../../../../frontend-hospital/src/app/models/motorista/motorista.model';
import Swal from 'sweetalert2';

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
  valChamado = false

  constructor
  (
    private chamadoService : ChamadoService,
    private authService : AuthService
  )
  {
    this.motorista = authService.getUser
    this.idMotorista = this.motorista.id
  }

  ngOnInit()
  {
    this.getAllChamados(this.idMotorista)
  }

  getAllChamados(id : number) {

      this.chamadoService.getChamadoByMotorista(id).subscribe({
      next: (res: any) => {
        this.chamados = res;

        if(this.chamados.length > 0)
          this.valChamado = true
        else
          this.valChamado = false

        if(this.chamados[0].tipoEmergencia == TiposEmergencia.GRAVE)
        {
          this.class = 'tipo font-tipo-red'
        }
        else if(this.chamados[0].tipoEmergencia == TiposEmergencia.MUITO_URGENTE)
        {
          this.class = 'tipo font-tipo-orange'
        }
        else
        {
          this.class = 'tipo font-tipo-yellow'
        }
      }
    });
  }


  finalizarChamado(id:number)
  {
    let obj = {
      id : id,
      estado : EstadosChamado[EstadosChamado.FINALIZADO]
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
        this.chamadoService.onFinishChamado(obj).subscribe(
          {
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Chamado finalizado com sucesso',
                timer: 3000,
                timerProgressBar: true,
              })

              this.valChamado = false
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
}
