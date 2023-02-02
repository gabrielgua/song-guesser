import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MusicaDialogComponent } from './musica-dialog/musica-dialog.component';
import { MusicaService } from './musica.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  musicas: any[] = [];
  search: string = '';

  dialogForm!: MatDialogRef<MusicaDialogComponent>

  constructor(
    private musicaService: MusicaService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.musicaService.getAllMusicas()
      .then((musicas: any) => {
        this.musicas = musicas;
        console.log(this.musicas);
        
        
      }).catch((error: any) => {
        console.log(error);
      })
  }

  openFormDialogEdit(musicaId: number, nomeMusica: string) {
    this.dialogForm = this.dialog.open(MusicaDialogComponent, {
      panelClass: 'custom',
      data: { id: musicaId, nome: nomeMusica},
      
    })
  }

}
