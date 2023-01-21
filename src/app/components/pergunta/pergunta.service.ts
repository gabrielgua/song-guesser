import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Resposta } from 'src/app/models/resposta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(private http: HttpClient) { }

  public gerarPerguntas(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${environment.API_URL}/perguntas/gerar`));
  }

  public responder(resposta: Resposta): Promise<Boolean> {
    return firstValueFrom(this.http.post<Boolean>(`${environment.API_URL}/perguntas/responder`, resposta));
  }
}
