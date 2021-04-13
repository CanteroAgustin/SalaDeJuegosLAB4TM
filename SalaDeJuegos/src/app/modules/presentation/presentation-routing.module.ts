import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGamePresentationComponent } from './pages/my-game-presentation/my-game-presentation.component';
import { QueEsComponent } from './pages/que-es/que-es.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';

const routes: Routes = [
  { path: '', redirectTo: '/presentation/quien-soy', pathMatch: 'full'},
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'que-es', component: QueEsComponent },
  { path: 'my-game', component: MyGamePresentationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
