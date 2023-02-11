import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MusicaComponent } from './components/musica/musica.component';
import { NaoAutorizadoComponent } from './components/nao-autorizado/nao-autorizado.component';
import { PerguntaComponent } from './components/pergunta/pergunta.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'authorized', component: AuthorizedComponent},
  {path: 'home', component: HomeComponent},
  {path: 'perguntas', component: PerguntaComponent},
  {path: 'musicas', component: MusicaComponent, canActivate: [AuthGuard]},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},


  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
