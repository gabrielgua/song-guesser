import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';


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
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { NaoAutorizadoComponent } from './components/nao-autorizado/nao-autorizado.component';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

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
    LoginComponent,
    AuthorizedComponent,
    NaoAutorizadoComponent,
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
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.TOKEN_ALLOWED_DOMAINS,
        disallowedRoutes: environment.TOKEN_DISALLOWED_DOMAINS
      },
    }),
  ],
  providers: [
    JwtHelperService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
