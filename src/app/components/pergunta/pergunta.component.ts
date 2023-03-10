import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/audio/audio.service';
import { Pergunta } from 'src/app/models/pergunta';
import { Resposta } from 'src/app/models/resposta';
import { SnackBarService } from 'src/app/snackbar/snack-bar.service';
import { LoaderService } from '../shared/loader.service';
import { PerguntaLoaderService } from '../shared/pergunta-loader.service';
import { PerguntaService } from './pergunta.service';


export const AUDIO_VOLUME = .3;

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit{
  
  perguntas: Pergunta[] = [];
  pergunta = new Pergunta();
  index: number = 0;
  respostaCerta: boolean = false;
  resposta: any;
  isLoading = false;
  initialLoading = false;

  jogo = {
    acertos: 0,
    jogando: false,
    ganhador: false,
    perdedor: false,
    respondendo: false,
    modo: '',
  }

  respostaInput = new FormControl(null, [Validators.required]);
  respostaRequest = new Resposta();

  constructor(
    private perguntaService: PerguntaService,
    private audioService: AudioService,
    private router: Router,
    private alert: SnackBarService,
    private perguntaLoader: PerguntaLoaderService,
    private loaderGeral: LoaderService,
    private changes: ChangeDetectorRef) {};

  ngOnInit(): void {
    this.jogo.jogando = true;
    this.getPerguntas();
    this.load();
    this.initialLoad();
  }

  initialLoad(): void {
    this.loaderGeral.getIsLoading().subscribe((isLoading) => {
      this.initialLoading = isLoading === true;
      this.changes.detectChanges();
    })
  }



  getPerguntas() {
    this.perguntaService.gerarPerguntas()
    .then((perguntas: Pergunta[]) => {
      this.perguntas = perguntas;
      
      this.selectPergunta(this.index);      
    }).catch((error: any) => {
      console.log(error);
      this.alert.abrirSnackBar('Erro ao gerar as perguntas.', 'error');
      
    })
  }

  selectPergunta(index: number) {
    this.pergunta = this.perguntas[index];
    this.audioService.playNext(this.pergunta.musica.arquivoDiretorio);
    this.jogo.respondendo = true;
  }

  getResposta(alternativaId: number) {
    this.pergunta.alternativas.forEach((alternativa: { id: number; }) => {
      if (alternativa.id == alternativaId) {
        this.resposta = alternativa;
      }
    });
  }

  responder() {
    if (this.isRespostaValid()) {
      
      this.respostaRequest.musicaId = this.pergunta.musica.id;
      this.respostaRequest.alternativaId = this.respostaInput.value!;

      this.perguntaService.responder(this.respostaRequest)
        .then((isCorreta: Boolean) => {
          if (isCorreta) {
            this.acertou();
            this.getResposta(this.respostaInput.value!);
          } else {
            this.errou();
            this.getResposta(this.respostaInput.value!);
            this.respostaInput.reset(); 
          }

        }).catch((error: any) => {
          console.log('Erro ao tentar responder!');
          this.alert.abrirSnackBar('Erro ao tentar responder.', 'error');
        })
    }
  }
  
  nextPergunta() {
    this.index++;
    this.respostaInput.reset(); 
    if (this.index < this.perguntas.length) {
      this.respostaCerta = false;
      this.selectPergunta(this.index);
    }
  }
    
  errou() {
    this.jogo.jogando = false;
    this.jogo.perdedor = true;  
    this.jogo.respondendo = false; 
  }

  acertou() {
    this.respostaCerta = true;
    this.jogo.respondendo = false;
    this.jogo.acertos++;
    this.checarGanhador();
  }

  checarGanhador() {
    if (this.jogo.acertos === this.perguntas.length) {
      this.jogo.jogando = false;
      this.jogo.ganhador = true;
    }
  }

  handlePlayPause() {
    if (!this.audioService.isPlaying()) {
      this.audioService.playAudio();
    } else {
      this.audioService.pauseAudio();
    }
  }

  recomecar() {
    this.audioService.stopAudio();
    this.router.navigate(['home']);
  }

  isRespostaValid(): boolean {
    return this.respostaInput.valid;
  }

  isMusicaTocando(): boolean {
    return this.audioService.isPlaying();
  }

  isResposta(alternativa: any) {
    return this.pergunta.musica.id == alternativa.musicaId;
  }

  load(): void {
    this.perguntaLoader.getIsLoading().subscribe((isLoading) => {
      this.isLoading = isLoading === true;
      this.changes.detectChanges();
    })
  }
}


