import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-motorista';

  constructor(private auth: AuthService) { }

  get logado() {
    return this.auth.getUser;
  }
}
