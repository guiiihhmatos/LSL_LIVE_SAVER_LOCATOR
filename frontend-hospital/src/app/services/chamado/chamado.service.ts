import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';
import { Chamado } from 'src/app/models/chamado/chamado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private readonly API = environment.apiUrl + '/chamado';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.API, {headers: this.setHeaders()});
  }

  saveChamado(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.API, chamado, {headers: this.setHeaders()});
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }
}
