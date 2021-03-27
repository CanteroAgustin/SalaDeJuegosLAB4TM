import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './guards/auth.guard';
import { PresentationComponent } from './components/presentation/presentation.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { QueEsComponent } from './components/que-es/que-es.component';
import { MyGamePresentationComponent } from './components/my-game-presentation/my-game-presentation.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent },
  {
    path: 'presentation', component: PresentationComponent,
    children: [
      {
        path: 'quien-soy',
        component: QuienSoyComponent,
      },
      {
        path: 'que-es',
        component: QueEsComponent,
      },
      {
        path: 'my-game-presentation',
        component: MyGamePresentationComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }