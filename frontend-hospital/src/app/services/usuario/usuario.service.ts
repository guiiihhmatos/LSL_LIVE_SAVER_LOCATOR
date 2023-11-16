import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { environment } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  private readonly API = environment.apiUrl + '/usuario';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllUsuarios(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<any>(this.API, {headers: this.setHeaders(), params}).pipe(

      // //aplicar gambiarra no pagination
      // map((res) => {
      //   let aux = res.content as Usuario[];
      //   const removeI = [] as number[];
      //   aux.forEach((usuario, i) => {
      //     if(usuario.role == 'USER_AMBULANCIA') removeI.push(i);
      //   })
      //   let removedI = 0;
      //   res.content = aux.filter((_, index) => {
      //     if(!removeI.includes(index)){
      //       removedI++;
      //     }
      //     return !removeI.includes(index);
      //   });
      //   res.totalElements = res.totalElements - (res.totalElements - removedI);

      //   return res;
      // })
    );
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

  filterUsuario(value: string, page: number, size: number, sort: string): Observable<any>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);
    return this.http.get<any>(this.API+'/filter/'+value, {headers: this.setHeaders(), params}).pipe(

    );
  }

  private setHeaders(): HttpHeaders {
    let token = this.auth.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}
