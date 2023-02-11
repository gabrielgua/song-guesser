import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, mergeMap, Observable } from "rxjs";
import { AuthService } from "./auth.service";

export class NotAuthenticatedError {};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}
    
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            !req.url.includes('/oauth2/token') 
            && !req.url.includes('/perguntas/gerar') 
            && !req.url.includes('/perguntas/responder') 
            && this.auth.isAcessTokenValido()) {
            return from(this.auth.gerarAccessTokenByRefreshToken())
                .pipe(
                    mergeMap(() => {
                        if (this.auth.isAcessTokenValido()) {
                            throw new NotAuthenticatedError();
                        }
                        
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })

                        return next.handle(req);
                    })
                )
        }
        return next.handle(req);
    }
}