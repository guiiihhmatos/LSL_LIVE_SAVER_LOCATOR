import { Component } from '@angular/core';
import { Chamado, TiposEmergencia } from 'src/app/models/chamado/chamado.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChamadoService } from 'src/app/services/chamado/chamado.service';
import { Motorista } from '../../../../../../frontend-hospital/src/app/models/motorista/motorista.model';

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

    let div = document.getElementById('tipo') as HTMLInputElement
    let icone = document.getElementById('icone') as HTMLInputElement

      this.chamadoService.getChamadoByMotorista(id).subscribe({
      next: (res: any) => {
        this.chamados = res;
        console.log(this.chamados)
        console.log(this.motorista)

        if(this.chamados[0].tipoEmergencia == TiposEmergencia.GRAVE)
        {
          this.class += 'tipo font-tipo-red font-red'

          console.log(this.chamados[0].tipoEmergencia)
        }
        else if(this.chamados[0].tipoEmergencia == TiposEmergencia.MUITO_URGENTE)
        {
          this.class += 'tipo font-tipo-orange font-orange'

          console.log(this.chamados[0].tipoEmergencia)
        }
        else
        {
          this.class += 'tipo font-tipo-yellow font-yellow'

          console.log(this.chamados[0].tipoEmergencia)
        }
      }
    });
  }
}
