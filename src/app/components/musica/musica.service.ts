import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  constructor(private http: HttpClient) { }


  getAllMusicas(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${environment.API_URL}/musicas?view=completa`));
  }
}
