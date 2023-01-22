import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/audio/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private audioService: AudioService) {};

  ngOnInit(): void {
    this.audioService.init();
    this.audioService.setAudioSrc("http://localhost:8080/musicas/11/arquivo");
    this.audioService.playAudio();
  }

  mute() {
    this.audioService.muteMusic();
  }

}
