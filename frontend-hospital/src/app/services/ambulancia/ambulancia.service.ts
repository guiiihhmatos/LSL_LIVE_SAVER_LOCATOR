import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Ambulancia, EstadosAmbulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmbulanciaService {

  private readonly API = environment.apiUrl + '/ambulancia';
  private readonly API_TOTAL = this.API + '/total';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllAmbulancias(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<Ambulancia[]>(this.API, {headers: this.setHeaders(), params});
  }

  getAllAmbulanciasDisponiveis(): Observable<Ambulancia[]> {
    return this.http.get<Ambulancia[]>(this.API + "/disponiveis", {headers: this.setHeaders()});
  }

  saveAmbulancia(ambulancia: Ambulancia): Observable<Ambulancia> {
   return this.http.post<Ambulancia>(this.API, ambulancia, {headers: this.setHeaders()})
  }

  editAmbulancia(ambulancia: Ambulancia): Observable<Ambulancia> {
    return this.http.put<Ambulancia>(this.API, ambulancia, {headers: this.setHeaders()});
  }

  getAmbulanciaById(idAmbulancia: number): Observable<Ambulancia> {
    return this.http.get<Ambulancia>(this.API + '/' + idAmbulancia, {headers: this.setHeaders()});
  }

  alterarEstadoAmbulancia(ambulancia: {id: number, estadoAmbulancia: EstadosAmbulancia | string}): Observable<Ambulancia>{
    return this.http.patch<Ambulancia>(this.API+"/alterar-estado", ambulancia, {headers: this.setHeaders()});
  }

  // dashboard

  getTotalDisponiveis(): Observable<number> {
    return this.http.get<number>(this.API_TOTAL + '/disponiveis', {headers: this.setHeaders()});
  }

  getTotalOcupadas(): Observable<number> {
    return this.http.get<number>(this.API_TOTAL + '/ocupadas', {headers: this.setHeaders()});
  }

  getTotalInativas(): Observable<number> {
    return this.http.get<number>(this.API_TOTAL + '/inativas', {headers: this.setHeaders()});
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}
