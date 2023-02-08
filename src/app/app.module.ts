import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PerguntaComponent } from './components/pergunta/pergunta.component';
import { VolumeComponent } from './components/volume/volume.component';
import { MusicaComponent } from './components/musica/musica.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MusicaDialogComponent } from './components/musica/musica-dialog/musica-dialog.component';
import { ArquivoDialogComponent } from './components/musica/arquivo-dialog/arquivo-dialog.component';
import { AlternativaDialogComponent } from './components/musica/alternativa-dialog/alternativa-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerguntaComponent,
    VolumeComponent,
    MusicaComponent,
    MusicaDialogComponent,
    ArquivoDialogComponent,
    AlternativaDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
