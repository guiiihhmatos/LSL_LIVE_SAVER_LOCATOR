import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosViaCep } from 'src/app/models/cep/dados-via-cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private api = "https://viacep.com.br/ws/"

  constructor
  (
    private http : HttpClient
  )
  { }

  getCep(cep : string | number): Observable<DadosViaCep>
  {
    return this.http.get<DadosViaCep>(this.api + cep + "/json/")
  }
}
