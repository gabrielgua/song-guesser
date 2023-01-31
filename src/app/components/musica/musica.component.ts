import { Component, OnInit } from '@angular/core';
import { MusicaService } from './musica.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  musicas: any[] = [];

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.musicaService.getAllMusicas()
      .then((musicas: any) => {
        this.musicas = musicas;
        
      }).catch((error: any) => {
        console.log(error);
      })
  }

}