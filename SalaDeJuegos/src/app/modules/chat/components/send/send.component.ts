import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { Message } from '../../models/message';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  message: Message = new Message;
  @Input() collection = '';

  formMessage = new FormGroup({
    message: new FormControl('', [Validators.required])
  });

  constructor(private firestoreMsgService: FirestoreMessageService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 2000,
    });
  }

  sendMessage() {
    const { message } = this.formMessage.value;
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    this.message.user = user.email;
    this.message.message = message;
    this.message.date = Date.now();
    this.firestoreMsgService.create(this.message, this.collection).then(() => {
      console.info('The message was sent successfuly!!!');
      this.openSnackBar("Mensaje enviado con exito!!!");
      this.formMessage.patchValue({ message: '' });
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
