import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SentComponent } from './components/sent/sent.component';
import { SendComponent } from './components/send/send.component';


@NgModule({
  declarations: [
    ChatComponent,
    SentComponent,
    SendComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports:
  [
    ChatComponent
  ]
})
export class ChatModule { }
