import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Encuesta } from 'src/app/models/encuesta';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { CloseDialogComponent } from '../../close-dialog/close-dialog.component';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  collection = '/encuestas';
  encuesta: Encuesta = new Encuesta;
  user: User | undefined;

  encuestaForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required
    ]),
    apellido: new FormControl('', [
      Validators.required
    ]),
    edad: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(99)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(10)
    ]),
    comoNosEncontraste: new FormControl('', [
      Validators.required
    ]),
    cuantoGusto: new FormControl(''),
    cualesJugaste: new FormControl('', [
      Validators.required
    ]),
    recomendarias: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private firestoreMsgService: FirestoreMessageService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.encuestaForm.patchValue({
      cuantoGusto: 5
    });
  }

  enviarEncuesta() {

    this.encuesta.usuario = this.user?.email;
    this.encuesta.nombre = this.encuestaForm.get('nombre')?.value;
    this.encuesta.apellido = this.encuestaForm.get('apellido')?.value;
    this.encuesta.edad = this.encuestaForm.get('edad')?.value;
    this.encuesta.telefono = this.encuestaForm.get('telefono')?.value;
    this.encuesta.comoNosEncontraste = this.encuestaForm.get('comoNosEncontraste')?.value;
    this.encuesta.cuantoGusto = this.encuestaForm.get('cuantoGusto')?.value;
    this.encuesta.cualesJugaste = this.encuestaForm.get('cualesJugaste')?.value;
    this.encuesta.recomendarias = this.encuestaForm.get('recomendarias')?.value;

    this.firestoreMsgService.saveResutGame(this.encuesta, this.collection).then(() => {
      const dialogRef = this.dialog.open(CloseDialogComponent, {
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['home']);
      });

      //dialogRef.close('Pizza!');
    }).catch((error: any) => {
      const dialogRef = this.dialog.open(CloseDialogComponent, {
        disableClose: true
      });
    });

  }
}
