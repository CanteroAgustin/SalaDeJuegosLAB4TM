import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { ColourPickerComponent } from './components/juegos/colour-picker/colour-picker.component';
import { MemoryComponent } from './components/juegos/memory/memory.component';
import { PiedraPapelTijeraComponent } from './components/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { TatetiComponent } from './components/juegos/tateti/tateti.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResultsComponent } from './components/results/results.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './guards/auth.guard';
import { PresentationComponent } from './modules/presentation/presentation.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'presentation', component: PresentationComponent, loadChildren: () => import('./modules/presentation/presentation.module').then(m => m.PresentationModule) },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'encuesta', component: EncuestaComponent },
  {
    path: 'juegos', canActivate: [AuthGuard],
    children: [
      { path: 'tateti', component: TatetiComponent },
      { path: 'piedraPapelTijera', component: PiedraPapelTijeraComponent },
      { path: 'memory', component: MemoryComponent },
      { path: 'colourPicker', component: ColourPickerComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }