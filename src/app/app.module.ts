import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PerguntaComponent } from './components/pergunta/pergunta.component';
import { VolumeComponent } from './components/volume/volume.component';
import { MusicaComponent } from './components/musica/musica.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerguntaComponent,
    VolumeComponent,
    MusicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
