import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoaderService } from "./loader.service";
import { PerguntaLoaderService } from "./pergunta-loader.service";

@Injectable()
export class LoaderBtnInterceptor implements HttpInterceptor {
    constructor(private service: PerguntaLoaderService) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/perguntas/responder')) {
            this.service.requestStarted();
        }

        return next.handle(req).pipe(
            finalize(() => {
                this.service.requestEnded();
            })
        )
    }

    
}