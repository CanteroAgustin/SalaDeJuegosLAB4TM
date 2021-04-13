import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  item$: Observable<any[]>;
  constructor(firestore: FirestoreMessageService) {
    this.item$ = firestore.ObtenerTodos().valueChanges();
  }

  ngOnInit(): void {
  }

}
