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
  @Input() destinatary: string = '';
  @Output() msgSent = new EventEmitter<boolean>();

  formMessage = new FormGroup({
    message: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
  });

  constructor(private firestoreMsgService: FirestoreMessageService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formMessage.patchValue({ 'to': this.destinatary });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 2000,
    });
  }

  sendMessage() {
    const { message, to } = this.formMessage.value;
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    this.message.user = user.email;
    this.message.to = to;
    this.message.message = message;
    this.message.date = Date.now();
    if (this.message.user && this.message.to && this.message.message) {
      this.firestoreMsgService.create(this.message).then(() => {
        console.info('The message was sent successfuly!!!');
        this.msgSent.emit(true);
        this.openSnackBar("Mensaje enviado con exito!!!");
      }).catch((error: any) => {
        console.error(error);
        this.msgSent.emit(false);
      });
    } else {
      this.msgSent.emit(false);
    }

  }

  cancel() {
    this.msgSent.emit(false);
  }
}
