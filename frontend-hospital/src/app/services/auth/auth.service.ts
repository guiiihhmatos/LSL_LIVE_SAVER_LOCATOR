import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'assets/json/user.json';

  constructor(private http: HttpClient, private cookie: CookieService,) { }

  login(data: unknown) {
    this.cookie.set('cookie-user-data', btoa(JSON.stringify(data)));
    return this.http.get<unknown>(this.API);
  }

  get getUser(): unknown {
    let user = atob(this.cookie.get('cookie-user-data'));
    return user? JSON.parse(user): user;
  }

}
