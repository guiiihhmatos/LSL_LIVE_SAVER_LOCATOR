import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Ambulancia } from 'src/app/models/ambulancia/ambulancia.model';

@Injectable({
  providedIn: 'root'
})
export class AmbulanciaService {

  private readonly API = environment.apiUrl + '/ambulancia';
  private readonly API_TOTAL = this.API + '/total';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllAmbulanciasDisponiveis(): Observable<Ambulancia[]> {
    return this.http.get<Ambulancia[]>(this.API + "/motorista/disponiveis");
  }

  setLocalAmbulancia(idAmbulancia: number, latitude: number, longitude: number): Observable<Ambulancia> {
    return this.http.patch<Ambulancia>(this.API + '/alterar-local', {id: idAmbulancia, latitude, longitude}, {headers: this.setHeaders()})
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }
}
