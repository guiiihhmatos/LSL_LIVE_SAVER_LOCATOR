import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = environment.apiUrl + '/motorista';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API, {headers: this.setHeaders()});
  }

  saveUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario, {headers: this.setHeaders()});
  }

  editUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.API, usuario, {headers: this.setHeaders()});
  }

  deleteUsuario(idUsuario: number): Observable<Usuario> {
    return this.http.delete<Usuario>(this.API + "/" + idUsuario, {headers: this.setHeaders()});
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}
