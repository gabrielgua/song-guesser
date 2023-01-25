import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio();
  private DEFAULT_VOLUME = .2;
  private playing: boolean = false;

  constructor() { }

  init(): void {
    this.audio.volume = this.DEFAULT_VOLUME;
    this.audio.loop = true;
    this.audio.autoplay = true;
  }

  public getAudio() {
    return this.audio;
  }
  
  public isPlaying() {
    return this.playing;
  }

  public isMuted() {
    return this.audio.muted;
  }

  public getVolume() {
    if (this.audio.muted) {
      return 0;
    }
    return this.audio.volume;
  }

  playNext(src: string) {
    this.audio.load();
    this.setAudioSrc(src);
    this.playAudio();
  }

  setAudioSrc(src: string) {
    this.audio.src = src;
  }

  setVolume(ev: Event) {
    this.audio.volume = Number((ev.target as HTMLInputElement).value);
  }

  muteAndUnmute() {
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
