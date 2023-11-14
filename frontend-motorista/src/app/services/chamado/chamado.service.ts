import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';
import { Chamado, EstadosChamado, formChamado } from 'src/app/models/chamado/chamado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private readonly API = environment.apiUrl + '/chamado';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getChamadoByMotorista(idMotorista : number): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.API + `/motorista/${idMotorista}`, {headers: this.setHeaders()});
  }

  onFinishChamado(obj : {})
  {
    return this.http.patch(this.API + '/alterar-estado', obj ,{headers: this.setHeaders()})
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}
