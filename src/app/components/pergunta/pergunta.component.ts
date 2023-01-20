import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Resposta } from 'src/app/models/resposta';
import { PerguntaService } from './pergunta.service';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit{
  
  perguntas: any[] = [];
  pergunta: any;
  index: number = 0;
  acertos: number = 0;
  jogando: boolean = false;
  perdeu: boolean = false;
  ganhou: boolean = false;


  respostaInput = new FormControl(null, [Validators.required]);
  respostaRequest = new Resposta();

  constructor(private perguntaService: PerguntaService) {};

  ngOnInit(): void {
    this.jogando = true;
    this.getPerguntas();
  }

  getPerguntas() {
    this.perguntaService.gerarPerguntas()
    .then((perguntas: any) => {
      this.perguntas = perguntas;
      this.selectPergunta(this.index);
      console.log(perguntas);
      
    }).catch((error: any) => {
      console.log('Erro ao gerar as perguntas!');
      console.log(error);
    })
  }

  selectPergunta(index: number) {
    this.pergunta = this.perguntas[index];
  }

  responder() {
    if (this.isRespostaValid()) {
      var resposta = this.respostaInput.value;
      var musicaId = this.pergunta.musica.id;
      
      this.respostaRequest.musicaId = musicaId;
      this.respostaRequest.alternativaId = resposta!;

      this.perguntaService.responder(this.respostaRequest)
        .then((isCorreta: Boolean) => {
          if (!isCorreta) {
            this.errou();
          } else {
            this.acertou();
          }

          this.resetarInput();
        }).catch((error: any) => {
          console.log('Erro ao tentar responder!');
        })
    }
  }
  
  nextPergunta() {
    this.index++;
    if (this.index < this.perguntas.length) {
      this.selectPergunta(this.index);
    } else {
      console.log('Fim das perguntas!');
    }
  }
    
  errou() {
    this.jogando = false;
    this.perdeu = true;    
  }

  acertou() {
    this.acertos++;
    this.nextPergunta();
    
    if (this.acertos === this.perguntas.length) {
      this.jogando = false;
      this.ganhou = true;
      console.log('God Gamer');
      //route to won page
    }
  }

  resetarInput() {
    this.respostaInput.reset(); 
  }

  recomecar() {
    window.location.reload();
  }

  isUltima(): boolean {   
    return this.index === this.perguntas.length
  }

  isRespostaValid(): boolean {
    return this.respostaInput.valid;
  }
}
