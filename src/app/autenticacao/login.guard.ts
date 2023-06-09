import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.usuarioService.estaLogado()) { //checa se o usuario está logado
        this.router.navigate(['animais']) //se estiver, vai ser jogado para a rota de animais
        return false
      }
      return true; //se não estiver, exibe a tela de login
  }
}
