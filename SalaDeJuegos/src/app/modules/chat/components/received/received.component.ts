import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/auth.service';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {

  messages: Message[] = [];
  user: User | undefined;
  displayedColumns: string[] = ['date', 'from', 'message', 'actions'];
  canReply: boolean = false;
  destinatary = '';

  constructor(private firestore: FirestoreMessageService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.firestore.getAll().valueChanges().subscribe(response => {
      this.messages = response.filter(data => {
        return data.to === this.user?.email;
      })
    });
  }

  reply(destinatary: string) {
    this.destinatary = destinatary;
    this.canReply = true;
  }

  handleMsgSent() {
    this.canReply = false;
  }
}
