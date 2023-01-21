import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/audio/audio.service';
import { Pergunta } from 'src/app/models/pergunta';
import { Resposta } from 'src/app/models/resposta';
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

  jogo = {
    acertos: 0,
    jogando: false,
    ganhador: false,
  }

  respostaInput = new FormControl(null, [Validators.required]);
  respostaRequest = new Resposta();

  constructor(
    private perguntaService: PerguntaService,
    private audioService: AudioService,
    private router: Router) {};

  ngOnInit(): void {
    this.jogo.jogando = true;
    this.getPerguntas();
  }

  isMusicaTocando(): boolean {
    return this.audioService.isPlaying();
  }

  getPerguntas() {
    this.perguntaService.gerarPerguntas()
    .then((perguntas: Pergunta[]) => {
      this.perguntas = perguntas;
      this.selectPergunta(this.index);      
    }).catch((error: any) => {
      console.log('Erro ao gerar as perguntas!');
      console.log(error);
    })
  }

  selectPergunta(index: number) {
    this.pergunta = this.perguntas[index];
    this.audioService.playNext(this.pergunta.musica.diretorio);
  }

  handleClick() {
    if (!this.audioService.isPlaying()) {
      this.audioService.playAudio();
    } else {
      this.audioService.pauseAudio();
    }
  }

  setVolume(event: Event) {
    this.audioService.setVolume(event);
  }

  getDefaultVolume() {
    return this.audioService.getDefaultVolume();
  }

  getVolume() {
    return this.audioService.getVolume() * 100;
  }

  responder() {
    if (this.isRespostaValid()) {
      
      this.respostaRequest.musicaId = this.pergunta.musica.id;
      this.respostaRequest.alternativaId = this.respostaInput.value!;

      this.perguntaService.responder(this.respostaRequest)
        .then((isCorreta: Boolean) => {
          if (isCorreta) {
            this.acertou();
          } else {
            this.errou();
          }

          this.respostaInput.reset(); 
        }).catch((error: any) => {
          console.log('Erro ao tentar responder!');
        })
    }
  }
  
  nextPergunta() {
    this.index++;
    if (this.index < this.perguntas.length) {
      this.selectPergunta(this.index);
    }
  }
    
  errou() {
    this.jogo.jogando = false;
    this.jogo.ganhador = false;    
  }

  acertou() {
    this.nextPergunta();
    this.checarGanhador();
  }

  checarGanhador() {
    var acertos = this.jogo.acertos++;
    if (acertos === this.perguntas.length) {
      this.jogo.jogando = false;
      this.jogo.ganhador = true;
    }
  }

  recomecar() {
    this.router.navigate(['home']);
    this.audioService.stopAudio();
  }

  isRespostaValid(): boolean {
    return this.respostaInput.valid;
  }
}


