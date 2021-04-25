import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/services/auth.service';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { ResultTateti } from './resultTateti';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {

  posiciones = [['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']];
  jugador = 'O';
  disabled = false;
  collection = "/tateti";
  collectionResults = "/tatetiResults"
  resultsTateti: ResultTateti[] = [];
  resultTateti: ResultTateti = new ResultTateti;
  user: User | undefined;
  ganadas = 0;
  perdidas = 0;
  empatadas = 0;

  constructor(private _snackBar: MatSnackBar, private firestore: AngularFirestore, private firestoreMsgService: FirestoreMessageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.firestoreMsgService.getResultGame(this.collectionResults).valueChanges().subscribe(response => {
      this.resultsTateti = response;
      this.resultsTateti.forEach(result => {
        if (this.user?.email === result.email) {
          if (result.ganadas && result.ganadas > this.ganadas) {
            this.ganadas = result.ganadas;
          }
          if (result.perdidas && result.perdidas > this.perdidas) {
            this.perdidas = result.perdidas;
          }
          if (result.empatadas && result.empatadas > this.empatadas) {
            this.empatadas = result.empatadas;
          }
        }
      });
    });
  }

  presion(fila: number, columna: number) {
    if (this.posiciones[fila][columna] == '-') {
      this.posiciones[fila][columna] = this.jugador;
      this.verificarGano('X');
      this.verificarGano('O');
      this.cambiarJugador();
    }
  }

  reiniciar() {
    this.disabled = false;
    for (let f = 0; f < 3; f++)
      for (let c = 0; c < 3; c++)
        this.posiciones[f][c] = '-';
  }

  cambiarJugador() {
    if (this.jugador == 'O')
      this.jugador = 'X';
    else
      this.jugador = 'O';
  }


  verificarGano(ficha: string) {
    if (this.posiciones[0][0] == ficha && this.posiciones[0][1] == ficha && this.posiciones[0][2] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[1][0] == ficha && this.posiciones[1][1] == ficha && this.posiciones[1][2] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[2][0] == ficha && this.posiciones[2][1] == ficha && this.posiciones[2][2] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][0] == ficha && this.posiciones[1][0] == ficha && this.posiciones[2][0] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][1] == ficha && this.posiciones[1][1] == ficha && this.posiciones[2][1] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][2] == ficha && this.posiciones[1][2] == ficha && this.posiciones[2][2] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][0] == ficha && this.posiciones[1][1] == ficha && this.posiciones[2][2] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][2] == ficha && this.posiciones[1][1] == ficha && this.posiciones[2][0] == ficha) {
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.disabled === true) {
      this.saveResults();
    }
  }

  saveResults() {
    this.resultTateti.empatadas = this.empatadas;
    this.resultTateti.ganadas = this.ganadas + 1;
    this.resultTateti.perdidas = this.perdidas;
    this.resultTateti.fecha = Date.now();
    this.resultTateti.email = this.user?.email;
    this.firestoreMsgService.saveResutGame(this.resultTateti, this.collectionResults).then(() => {
    }).catch((error: any) => {
      console.error(error);
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 2000,
    });
  }
}
