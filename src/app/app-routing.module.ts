import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerguntaComponent } from './components/pergunta/pergunta.component';
import { VolumeComponent } from './components/volume/volume.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'perguntas', component: PerguntaComponent},
  {path: 'volume', component: VolumeComponent},


  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
