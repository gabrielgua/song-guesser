import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export class AlternativaRequest {
  nome!: string;
  musicaId?: number;
}


@Injectable({
  providedIn: 'root'
})
export class AlternativaService {

  constructor(private http: HttpClient) { }

  addAlternativa(alternativaRequest: AlternativaRequest): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${environment.API_URL}/alternativas`, alternativaRequest));
  }

  editAlternativa(alternativaId: number, alternativaRequest: AlternativaRequest): Promise<any> {
    return firstValueFrom(this.http.put<any>(`${environment.API_URL}/alternativas/${alternativaId}`, alternativaRequest));
  }

  removeAlternativa(alternativaId: number): Promise<void> {
    return firstValueFrom(this.http.delete<any>(`${environment.API_URL}/alternativas/${alternativaId}`));
  }
}
