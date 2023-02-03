import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MusicaRequest } from './musica.component';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  constructor(private http: HttpClient) { }


  getAllMusicas(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${environment.API_URL}/musicas?view=completa`));
  }

  saveMusica(musicaRequest: MusicaRequest): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${environment.API_URL}/musicas`, musicaRequest));
  }

  editMusica(musicaId: number, musicaRequest: MusicaRequest): Promise<any> {
    return firstValueFrom(this.http.put<any>(`${environment.API_URL}/musicas/${musicaId}`, musicaRequest));
  }

  removeMusicaById(musicaId: number): Promise<void> {
    return firstValueFrom(this.http.delete<any>(`${environment.API_URL}/musicas/${musicaId}`));
  }

  addArquivo(musicaId: number, arquivo: File): Observable<any> {
    var fd = new FormData();
    fd.append('arquivo', arquivo);

    return this.http.post<any>(`${environment.API_URL}/musicas/${musicaId}/arquivo`, fd, { reportProgress: true, observe: 'events' });
  }
}
