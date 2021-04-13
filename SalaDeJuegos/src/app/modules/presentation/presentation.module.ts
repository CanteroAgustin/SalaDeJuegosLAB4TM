import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PresentationToolbarComponent } from 'src/app/modules/presentation/components/presentation-toolbar/presentation-toolbar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MyGamePresentationComponent } from './pages/my-game-presentation/my-game-presentation.component';
import { QueEsComponent } from './pages/que-es/que-es.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationComponent } from './presentation.component';



@NgModule({
  declarations: [
    PresentationComponent,
    QueEsComponent,
    QuienSoyComponent,
    MyGamePresentationComponent,
    PresentationToolbarComponent
  ],
  imports: [
    CommonModule,
    PresentationRoutingModule,
    AngularMaterialModule
  ]
})
export class PresentationModule { }
