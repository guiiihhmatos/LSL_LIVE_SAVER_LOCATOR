import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Motorista } from 'src/app/models/motorista/motorista.model';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  private readonly API = environment.apiUrl + '/motorista';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllMotoristas(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<any>(this.API, {headers: this.setHeaders(), params});
  }
  getAllUsuarios(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<any>(this.API, {headers: this.setHeaders(), params});
  }

  saveMotorista(Motorista: Motorista): Observable<Motorista> {
    return this.http.post<Motorista>(this.API, Motorista, {headers: this.setHeaders()});
  }

  editMotorista(Motorista: Motorista): Observable<Motorista> {
    return this.http.put<Motorista>(this.API, Motorista, {headers: this.setHeaders()});
  }

  deleteMotorista(idMotorista: number): Observable<Motorista> {
    return this.http.delete<Motorista>(this.API + "/" + idMotorista, {headers: this.setHeaders()});
  }

  getAllMotoristaLogged(): Observable<Motorista> {
    return this.http.get<Motorista>(this.API + '/logados', {headers: this.setHeaders()})
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }
}
