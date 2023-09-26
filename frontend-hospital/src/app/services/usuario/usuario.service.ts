import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'assets/json/usuarios.json';

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  saveUsuario(usuario: Usuario): Observable<any> {
    // return new Observable<{message: 'salvo'}>
    return new Observable;
    // return this.http.post<Usuario>(this.API, usuario)
  }

}
