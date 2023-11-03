import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  usuario: Usuario;
  panelOpenState = false;
  constructor(private auth: AuthService){
    this.usuario = auth.getUser;
  }

  logout(){
    this.auth.logout();
  }

}
