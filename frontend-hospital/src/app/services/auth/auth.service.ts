import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.apiUrl + "/usuario/login";

  constructor(private http: HttpClient, private cookie: CookieService, private rota: Router) { }

  login(data: {login: string, password: string}): Observable<any> {
    return this.http.post<any>(this.API, data)
    .pipe(
      map(({token, usuario}) => {
        this.cookie.set('cookie-token', btoa(token), { expires: 8/24, path: '/' },);
        this.cookie.set('cookie-user-data', btoa(JSON.stringify(usuario)),  { expires: 8/24, path: '/' });
        return {token, usuario};
      })
    );

  }

  logout() {
    this.cookie.delete('cookie-user-data')
    this.cookie.delete('cookie-token')
    this.rota.navigate(['/login'])
  }

  get getUser(): Usuario {
    let user = atob(this.cookie.get('cookie-user-data'),);
    return user? JSON.parse(user): user;
  }

  get getToken(): string {
    return atob(this.cookie.get('cookie-token'));
  }

}
