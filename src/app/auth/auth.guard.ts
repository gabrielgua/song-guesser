import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.auth.isAcessTokenValido()) {
            console.log('Token inválido, grando novo token...');
            
            return this.auth.gerarAccessTokenByRefreshToken()
                .then(() => {
                    if (this.auth.isAcessTokenValido()) {
                        this.router.navigate(['/login']);
                        return false;
                    }

                    return true;
                })
        } else if (route.data['roles'] && !this.auth.temQualquerPermissao(route.data['roles'])) {
            console.log(route.data['roles']);
            
            this.router.navigate(['/nao-autorizado']);
            return false;
        }

        return true;
    }

}