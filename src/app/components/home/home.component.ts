import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/audio/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private audioService: AudioService) {};

 
}
