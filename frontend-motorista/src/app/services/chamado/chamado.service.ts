import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';
import { Chamado, formChamado } from 'src/app/models/chamado/chamado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private readonly API = environment.apiUrl + '/chamado';
  private readonly API_TOTAL = this.API + '/total';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllChamados(page: number, size: number, sort: string): Observable<Chamado[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<Chamado[]>(this.API, {headers: this.setHeaders()});
  }

  saveChamado(chamado: formChamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.API, chamado, {headers: this.setHeaders()});
  }

  editChamado(chamado: formChamado): Observable<Chamado> {
    return this.http.put<Chamado>(this.API, chamado, {headers: this.setHeaders()});
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}