import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlternativaDialogComponent } from './alternativa-dialog/alternativa-dialog.component';
import { AlternativaRequest, AlternativaService } from './alternativa.service';
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
  search: string = '';
  

  dialogMusica!: MatDialogRef<MusicaDialogComponent>
  dialogArquivo!: MatDialogRef<ArquivoDialogComponent>
  dialogAlternativa!: MatDialogRef<AlternativaDialogComponent>

  constructor(
    private musicaService: MusicaService,
    private alternativaService: AlternativaService,
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

  openFormDialogAlternativa(musica: any, alternativa?: any): void {
    this.dialogAlternativa = this.dialog.open(AlternativaDialogComponent, {
      data: { id: alternativa?.id, nome: alternativa?.nome, musicaNome: musica.nome }
    });

    
    this.dialogAlternativa.afterClosed().subscribe(newAlternativa => {
      if (newAlternativa != null && newAlternativa != true) {
        var alternativaRequest = new AlternativaRequest();
        alternativaRequest.nome = newAlternativa
        
        if (alternativa && newAlternativa != true) {
          this.editarAlternativa(alternativa.id, alternativaRequest);
        } else {
          alternativaRequest.musicaId = musica.id;
          this.salvarAlternativa(alternativaRequest);
        }
      } else {
        this.removerAlternativa(alternativa.id);
      }
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
        console.log('Musica alterada com sucesso.');
        
      }).catch(error => console.log(error))
  }

  salvar(musicaRequest: MusicaRequest) {
    this.musicaService.saveMusica(musicaRequest)
      .then((musica) => {
        this.buscarMusicas();
        console.log('Música adicionada com sucesso.');
        
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

  salvarAlternativa(alternativaRequest: AlternativaRequest) {
    this.alternativaService.addAlternativa(alternativaRequest)
      .then(() => {
        this.buscarMusicas();
        console.log('Alternativa adicionada com sucesso.');
        
      }).catch(error => console.log(error))
  }

  editarAlternativa(alternativaId: number, alternativaRequest: AlternativaRequest) {
    this.alternativaService.editAlternativa(alternativaId, alternativaRequest)
      .then(() => {
        this.buscarMusicas();
        console.log('Alternativa alterada com sucesso.');
        
      }).catch(error => console.log(error))
  }

  removerAlternativa(alternativaId: number) {
    this.alternativaService.removeAlternativa(alternativaId)
      .then(() => {
        this.buscarMusicas();
        console.log('Alternativa removida com sucesso.');
        
      }).catch(error => console.log(error))
  }

  remover(musicaId: number) {
    this.musicaService.removeMusicaById(musicaId)
      .then(() => {
        this.buscarMusicas();
        console.log('Música removida com sucesso!');
        
      }).catch(error => console.log(error))
  }
}
