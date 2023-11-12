import { Component } from '@angular/core';
import { Chamado } from 'src/app/models/chamado/chamado.model';
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
      }
    });
  }
}
