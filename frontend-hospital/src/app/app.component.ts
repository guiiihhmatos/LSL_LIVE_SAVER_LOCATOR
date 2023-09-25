import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-hospital';

  constructor(private auth: AuthService){}

  get logado(){
    return this.auth.getUser;
  }

  ngOnInit(): void {
  }
}
