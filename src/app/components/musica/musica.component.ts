import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArquivoDialogComponent } from './arquivo-dialog/arquivo-dialog.component';
import { MusicaDialogComponent } from './musica-dialog/musica-dialog.component';
import { MusicaService } from './musica.service';

export class MusicaRequest {
  nome!: string;
}

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  musicas: any[] = [];
  musica: any;
  search: string = '';
  

  dialogMusica!: MatDialogRef<MusicaDialogComponent>
  dialogArquivo!: MatDialogRef<ArquivoDialogComponent>

  constructor(
    private musicaService: MusicaService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.buscarMusicas();
  }

  buscarMusicas() {
    this.musicaService.getAllMusicas()
    .then((musicas: any) => {
      this.musicas = musicas;
      console.log(this.musicas);
      
    }).catch((error: any) => {
      console.log(error);
    })
  }

  openFormDialogAdd(): void {
    this.dialogMusica = this.dialog.open(MusicaDialogComponent, {
      data: { id: null, nome: null }
    })

    this.dialogMusica.afterClosed().subscribe(nome => {
      if (nome) {
        var musicaRequest = new MusicaRequest();
        musicaRequest.nome = nome;
  
        this.salvar(musicaRequest);
      }
    })
  }

  openFormDialogEdit(musicaId: number, nomeMusica: string): void {
    this.dialogMusica = this.dialog.open(MusicaDialogComponent, {
      data: { id: musicaId, nome: nomeMusica},
    })

    this.dialogMusica.afterClosed().subscribe(nome => {
      if (nome && nome !== nomeMusica) {
        var musicaRequest = new MusicaRequest();
        musicaRequest.nome = nome;
  
        this.editar(musicaId, musicaRequest);
      };
    })
  }

  openFormDialogArquivo(musica: any): void {
    var nomeArquivo = musica.arquivo?.nomeArquivo;
    this.dialogArquivo = this.dialog.open(ArquivoDialogComponent, {
      data: { id: musica.id, nome: musica.nome, nomeArquivo: nomeArquivo }
    })

    this.dialogArquivo.afterClosed().subscribe(arquivo => {
      if (arquivo) {
        this.salvarArquivo(musica.id, arquivo);
      }
    })
  }

  editar(musicaId: number, musicaRequest: MusicaRequest): void {
    this.musicaService.editMusica(musicaId, musicaRequest)
      .then(() => {
        this.buscarMusicas();
        console.log('Musica alterada com sucesso!');
        
      }).catch(error => console.log(error))
  }

  salvar(musicaRequest: MusicaRequest) {
    this.musicaService.saveMusica(musicaRequest)
      .then((musica) => {
        this.buscarMusicas();
        console.log('Música adicionada com sucesso!');
        
        this.openFormDialogArquivo(musica);
      }).catch(error => console.log(error))
  }

  salvarArquivo(musicaId: number, arquivo: File) {
    this.musicaService.addArquivo(musicaId, arquivo)
      .subscribe((events) => {
          console.log(events);
          
          this.buscarMusicas();
          console.log('Arquivo adicionado com sucesso.');
      });
  }

  remover(musicaId: number) {
    this.musicaService.removeMusicaById(musicaId)
      .then(() => {
        this.buscarMusicas();
        console.log('Música removida com sucesso!');
        
      }).catch(error => console.log(error))
  }
}
