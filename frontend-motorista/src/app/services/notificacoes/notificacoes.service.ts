import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {

  private readonly API = environment.apiUrl + '/notificacao';

  constructor(private http: HttpClient, private auth: AuthService) {}

  criarNotificacao(mensagem: string) {
    const notificacao: any = { mensagem: mensagem };
    return this.http.post(this.API, notificacao ,{headers: this.setHeaders()});
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}
