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
import { ColourPickerComponent } from './components/juegos/colour-picker/colour-picker.component';
import { GameCardComponent } from './components/juegos/game-card/game-card.component';
import { MatchingGameComponent } from './components/juegos/matching-game/matching-game.component';
import { MemoryCardComponent } from './components/juegos/memory/memory-card/memory-card.component';
import { MemoryComponent } from './components/juegos/memory/memory.component';
import { RestartDialogComponent } from './components/juegos/memory/restart-dialog/restart-dialog.component';
import { PiedraPapelTijeraComponent } from './components/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { TatetiComponent } from './components/juegos/tateti/tateti.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AngularMaterialModule } from "./modules/angular-material/angular-material.module";
import { ChatModule } from './modules/chat/chat.module';
import { AuthService } from "./services/auth.service";
import { ResultsComponent } from './components/results/results.component';
import { ColourPickerResultsComponent } from './components/results/colour-picker-results/colour-picker-results.component';

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
    RestartDialogComponent,
    MatchingGameComponent,
    ColourPickerComponent,
    ResultsComponent,
    ColourPickerResultsComponent
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
