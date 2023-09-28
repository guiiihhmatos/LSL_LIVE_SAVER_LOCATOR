import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.apiUrl + '/motorista/login';

  constructor(private http: HttpClient, private cookie: CookieService,) { }

  login(data: {login: string, password: string}): Observable<unknown> {
    return this.http.post<unknown>(this.API, data).pipe(map ((token) => {
      console.log(token)
    }))
    this.cookie.set('cookie-user-data', btoa(JSON.stringify(data)));

  }

  get getUser(): unknown {
    let user = atob(this.cookie.get('cookie-user-data'));
    return user? JSON.parse(user): user;
  }

}
