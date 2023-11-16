import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacao } from 'src/app/models/notificacao/notificacao.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {

  private readonly API = environment.apiUrl + '/notificacao';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getNotificacoesNaoLidas(): Observable<any> {
    return this.http.get(this.API, {headers: this.setHeaders()});
  }

  marcarComoLida(id: number): Observable<Notificacao> {
    return this.http.put<Notificacao>(this.API + `/${id}/marcarComoLida` ,{headers: this.setHeaders()});
  }


  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }
}
