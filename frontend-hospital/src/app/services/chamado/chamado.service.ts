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
  private readonly API_TOTAL = this.API + '/total';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllChamados(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<any>(this.API, {headers: this.setHeaders(), params});
  }

  getChamadosByEstado(estadoChamado: EstadosChamado){
    return this.http.get<Chamado[]>(this.API+"/estadoChamado/"+EstadosChamado[estadoChamado], {headers: this.setHeaders()});
  }

  saveChamado(chamado: formChamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.API, chamado, {headers: this.setHeaders()});
  }

  editChamado(chamado: formChamado): Observable<Chamado> {
    return this.http.put<Chamado>(this.API, chamado, {headers: this.setHeaders()});
  }

  filterChamado(value: string, page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<any>(this.API+'/filter/'+value, {headers: this.setHeaders(), params});
  }

  // dashboard

  getTotalACaminho(): Observable<number> {
    return this.http.get<number>(this.API_TOTAL + '/acaminho', {headers: this.setHeaders()});
  }

  getTotalRetornando(): Observable<number> {
    return this.http.get<number>(this.API_TOTAL + '/retornando', {headers: this.setHeaders()});
  }

  getTotalFinalizados(): Observable<number> {
    return this.http.get<number>(this.API_TOTAL + '/finalizado', {headers: this.setHeaders()});
  }

  getTempoMedio(): Observable<any> {
    return this.http.get<any>(this.API + '/tempo-medio', {headers: this.setHeaders()})
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }
}
