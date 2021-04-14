import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/services/auth.service';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

  messages: Message[] = [];
  user: User | undefined;
  displayedColumns: string[] = ['date', 'from', 'message'];
  canSend = false;

  constructor(firestore: FirestoreMessageService) {
    firestore.getAll().valueChanges().subscribe(response => {
      this.messages = response.filter(data => {
        return data.user === this.user?.email;
      })
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
  }

  handleMsgSent(){
    this.canSend = false;
  }

  showSend(){
    this.canSend = true;
  }

}
