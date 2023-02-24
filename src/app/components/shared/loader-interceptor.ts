import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoaderService } from "./loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private service: LoaderService) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/perguntas/responder') && !req.url.includes('/arquivo')) {
            this.service.requestStarted();
        }

        return next.handle(req).pipe(
            finalize(() => {
                this.service.requestEnded();
            })
        )
    }

    
}