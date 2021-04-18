import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AngularMaterialModule } from "./modules/angular-material/angular-material.module";
import { AuthService } from "./services/auth.service";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { TatetiComponent } from './components/tateti/tateti.component';
import { ChatModule } from './modules/chat/chat.module';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MemoryComponent } from './components/memory/memory.component';
import { MemoryCardComponent } from './components/memory/memory-card/memory-card.component';
import { RestartDialogComponent } from './components/memory/restart-dialog/restart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    SidebarComponent,
    GameCardComponent,
    TatetiComponent,
    PiedraPapelTijeraComponent,
    PageNotFoundComponent,
    MemoryComponent,
    MemoryCardComponent,
    RestartDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChatModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
