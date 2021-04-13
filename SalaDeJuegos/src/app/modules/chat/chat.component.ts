import { Component, OnInit } from '@angular/core';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { Message } from './models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: Message = new Message;

  constructor(private firestoreMsgService: FirestoreMessageService) { }

  ngOnInit(): void {
  }

  SendMessage() {
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    this.message.user = user.displayName;
    this.firestoreMsgService.Crear(this.message).then(() => {
      console.info('The message was sent successfuly!!!');
    });
  }
}
