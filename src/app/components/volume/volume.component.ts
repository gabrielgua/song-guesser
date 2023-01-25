import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/audio/audio.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.init();
  }

  setVolume(event: Event) {
    this.audioService.setVolume(event);    
  }

  getVolumeValue() {
    return this.audioService.getVolume();
  }

  getVolumePercentage() {
    return this.audioService.getVolume() * 100;
  }

  getVolumeIcon() {
    var icon = '';
    if (this.getVolumePercentage() <= 50) {
      icon = 'volume_down';
    } else {
      icon = 'volume_up';
    } 
  }

  handleMuteClick() {
    this.audioService.muteAndUnmute();
  }

  isMuted() {
    return this.audioService.isMuted();
  }

}
