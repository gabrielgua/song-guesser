import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/snackbar/snack-bar.service';
import { AlternativaDialogComponent } from './alternativa-dialog/alternativa-dialog.component';
import { AlternativaRequest, AlternativaService } from './alternativa.service';
import { ArquivoDialogComponent } from './arquivo-dialog/arquivo-dialog.component';
import { MusicaDialogComponent } from './musica-dialog/musica-dialog.component';
import { MusicaService } from './musica.service';

import { HttpEventType } from '@angular/common/http';
import { Musica } from 'src/app/models/musica';

export class MusicaRequest {
  nome!: string;
}

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  musicas: Musica[] = [];
  search: string = '';
  
  dialogMusica!: MatDialogRef<MusicaDialogComponent>
  dialogArquivo!: MatDialogRef<ArquivoDialogComponent>
  dialogAlternativa!: MatDialogRef<AlternativaDialogComponent>

  constructor(
    private musicaService: MusicaService,
    private alternativaService: AlternativaService,
    private dialog: MatDialog,
    private alert: SnackBarService) {}

  ngOnInit(): void {
    this.buscarMusicas();
  }

  buscarMusicas() {
    this.musicaService.getAllMusicas()
    .then((musicas: Musica[]) => {
      this.musicas = musicas;
      
    }).catch((error: any) => {
      console.log(error);
      this.alert.abrirSnackBar('Erro ao buscar as músicas.', 'error');
    })
  }

  buscarPorId(musicaId: number): any {
    return this.musicas.find(musica => musica.id === musicaId);
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
      } else if (newAlternativa) {
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
        this.alert.abrirSnackBar('Música alterada com sucesso.', 'success');
        
      }).catch(error => {
        console.log(error);
        this.alert.abrirSnackBar('Erro ao editar música.' + musicaId, 'error');
      })

  }

  salvar(musicaRequest: MusicaRequest) {
    this.musicaService.saveMusica(musicaRequest)
      .then((musica) => {
        this.buscarMusicas();
        this.alert.abrirSnackBar('Música adicionada com sucesso.', 'success');
        
        this.openFormDialogArquivo(musica);
      }).catch(error => {
        console.log(error);
        this.alert.abrirSnackBar('Erro ao adicionar nova música.', 'error');
      })
  }

  salvarArquivo(musicaId: number, arquivo: File) {
    var musica = this.buscarPorId(musicaId);
    this.musicaService.addArquivo(musicaId, arquivo)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          musica.uploadProgress = Math.round(event.loaded / event.total * 100);
          musica.uploading = true;
        
        } else if (event.type === HttpEventType.Response) {          
          this.atualizarArquivo(musica, event);
          musica.uploading = false;
          musica.uploadProgress = 0;
          this.alert.abrirSnackBar('Arquivo adicionado com sucesso.', 'success');
        }
      });
  }

  atualizarArquivo(musica: Musica, request: any): void {
    var arquivo = {
      contentType: request.body.contentType,
      diretorio: request.body.diretorio,
      nomeArquivo: request.body.nomeArquivo,
      tamanho: request.body.tamanho,
    }

    musica.arquivo = arquivo;
  }

  salvarAlternativa(alternativaRequest: AlternativaRequest) {
    this.alternativaService.addAlternativa(alternativaRequest)
      .then(() => {
        this.buscarMusicas();
        this.alert.abrirSnackBar('Alternativa adicionada com sucesso.', 'success');
        
      }).catch(error => {
        console.log(error);
        this.alert.abrirSnackBar('Erro ao adicionar nova alternativa.', 'error');
      })
  }

  editarAlternativa(alternativaId: number, alternativaRequest: AlternativaRequest) {
    this.alternativaService.editAlternativa(alternativaId, alternativaRequest)
      .then(() => {
        this.buscarMusicas();
        this.alert.abrirSnackBar('Alternativa alterada com sucesso.', 'success');
      }).catch(error => {
        console.log(error);
        this.alert.abrirSnackBar('Erro ao editar alternativa.', 'error');
      })
  }

  removerAlternativa(alternativaId: number) {
    this.alternativaService.removeAlternativa(alternativaId)
      .then(() => {
        this.buscarMusicas();
        this.alert.abrirSnackBar('Alternativa removida com sucesso.', 'success');
        
      }).catch(error => {
        console.log(error);
        this.alert.abrirSnackBar('Erro ao remover alternativa.', 'error');
      })
  }

  remover(musicaId: number) {
    this.musicaService.removeMusicaById(musicaId)
      .then(() => {
        this.buscarMusicas();
        this.alert.abrirSnackBar('Música removida com sucesso.', 'success');
        
      }).catch(error => {
        console.log(error);
        this.alert.abrirSnackBar(error.error.userMessage, 'error');
      })
  }
}
