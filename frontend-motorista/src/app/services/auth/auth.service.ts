import { Motorista } from './../../../../../frontend-hospital/src/app/models/motorista/motorista.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private readonly API = environment.apiUrl + "/motorista";

  constructor(private http: HttpClient, private cookie: CookieService, private rota: Router) { }

  login(data: {login: string, password: string}): Observable<any> {
    return this.http.post<any>(this.API+"/login", data)
    .pipe(
      map(({token, motorista}) => {
        this.cookie.set('cookie-token', btoa(token), { expires: 1/24, path:'motorista' });
        this.cookie.set('cookie-user-data', btoa(JSON.stringify(motorista)),  { expires: 1/24, path: 'motorista' });
        return {token, motorista};
      })
    );

  }

  logout(idMotorista: number) {
    this.http.post<string>(this.API+"/logout", idMotorista, {headers: this.setHeaders()}).subscribe({
      next: (res) => {
        this.cookie.deleteAll('motorista');
        this.rota.navigate(['/login'])
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get getUser(): Motorista {
    let user = atob(this.cookie.get('cookie-user-data'),);
    return user? JSON.parse(user): user;
  }

  get getToken(): string {
    return atob(this.cookie.get('cookie-token'));
  }

  private setHeaders(): HttpHeaders {
    let token = this.getToken;
    return new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  }

}
