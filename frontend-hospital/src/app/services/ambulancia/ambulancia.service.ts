import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmbulanciaService {

  private readonly API = environment.apiUrl + '/ambulancia';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllAmbulancias(): Observable<Ambulancia[]> {
    return this.http.get<Ambulancia[]>(this.API, {headers: this.setHeaders()});
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

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}
