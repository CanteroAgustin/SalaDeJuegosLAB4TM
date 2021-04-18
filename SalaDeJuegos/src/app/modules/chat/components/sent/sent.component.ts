import { Component, Input, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['date', 'user','message'];
  canSend = false;
  @Input() collection = '';

  constructor(private firestore: FirestoreMessageService) {
    
  }

  ngOnInit(): void {
    this.firestore.getAll(this.collection).valueChanges().subscribe(response => {
      this.messages = response;
    });
  }

  handleMsgSent() {
    this.canSend = false;
  }

  showSend() {
    this.canSend = true;
  }

}
