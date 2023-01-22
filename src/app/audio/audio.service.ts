import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio();
  private DEFAULT_VOLUME = .2;
  private playing: boolean = false;

  constructor() { }

  init(): void {
    this.setInitialConfigs();
  }

  public getAudio() {
    return this.audio;
  }
  
  public isPlaying() {
    return this.playing;
  }

  public getDefaultVolume() {
    return this.DEFAULT_VOLUME;
  }

  public getVolume() {
    return this.audio.volume;
  }

  public setLoop(loop: boolean) {
    return this.audio.loop = loop;
  }

  playNext(src: string) {
    this.audio.load();
    this.setAudioSrc(src);
    this.playAudio();
  }

  setInitialConfigs() {
    this.audio.volume = this.DEFAULT_VOLUME;
    this.audio.pause();
    this.audio.loop = true;
  }

  setAudioSrc(src: string) {
    this.audio.src = src;
  }

  setVolume(ev: Event) {
    this.audio.volume = Number((ev.target as HTMLInputElement).value);
  }

  muteMusic() {
    this.audio.muted = !this.audio.muted;
  }

  playAudio() {
    this.audio.play();
    this.playing = true;
  }

  pauseAudio() {
    this.audio.pause();
    this.playing = false;
  }

  stopAudio() {
    this.audio.src = '';
    this.audio.currentTime = 0;
    this.pauseAudio();
  }






}
