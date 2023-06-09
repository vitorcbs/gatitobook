import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animais, Animal } from './animais';
import { TokenService } from '../autenticacao/token.service';
import { environment } from 'src/environments/environment';

const API = environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    const token = this.tokenService.retornaToken() //captura o token
    const headers = new HttpHeaders().append('x-access-token', token) //cria o headers da requisição no elemento x-access que é onde pede o token
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`, { //faz a requisição da informação e passando o header
      headers,
    })
  }

  buscaPorID(id: number): Observable<Animal> {
    const token = this.tokenService.retornaToken()
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.get<Animal>(`${API}/photos/${id}`, {headers})
  }
}
