import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
    if (this.posiciones[0][0] == ficha && this.posiciones[0][1] == ficha && this.posiciones[0][2] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[1][0] == ficha && this.posiciones[1][1] == ficha && this.posiciones[1][2] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[2][0] == ficha && this.posiciones[2][1] == ficha && this.posiciones[2][2] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][0] == ficha && this.posiciones[1][0] == ficha && this.posiciones[2][0] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][1] == ficha && this.posiciones[1][1] == ficha && this.posiciones[2][1] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][2] == ficha && this.posiciones[1][2] == ficha && this.posiciones[2][2] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][0] == ficha && this.posiciones[1][1] == ficha && this.posiciones[2][2] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
    if (this.posiciones[0][2] == ficha && this.posiciones[1][1] == ficha && this.posiciones[2][0] == ficha){
      this.openSnackBar('Gano:' + ficha);
      this.disabled = true;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 2000,
    });
  }
}
