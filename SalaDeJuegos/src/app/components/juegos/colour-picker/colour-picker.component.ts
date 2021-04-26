import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'firebase';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { ResultColourPicker } from './resultColourPicker';

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.scss']
})
export class ColourPickerComponent implements OnInit {

  colors: string[] = [];
  principalColour = "white";
  principalColourText = "";
  count = 5;
  intentos = 0;
  playing = false;
  hasWon = false;
  collection = "/colourPicker";
  collectionResults = "/colourPickerResults";
  user: User | undefined;
  resultColourPicker: ResultColourPicker = new ResultColourPicker;
  timer: number = 0;
  segundos: number = 0;
  minutos: number = 0;

  constructor(private _snackBar: MatSnackBar, private firestoreMsgService: FirestoreMessageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
  }

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }

  onSelectColour(colour: string) {
    this.intentos = this.intentos + 1;
    if (colour === this.principalColourText) {
      this.principalColour = this.principalColourText;
      this.hasWon = true;
      this.openSnackBar('Felicidades!!! Lo lograste en ' + this.intentos + ' intentos.');
      this.saveResults(this.intentos);
    }
  }

  saveResults(intentos: number) {
    this.resultColourPicker.intentos = intentos;
    this.resultColourPicker.fecha = Date.now();
    this.resultColourPicker.email = this.user?.email;
    this.resultColourPicker.tiempo = this.minutos + " : " + this.segundos + " : " + this.timer;
    this.firestoreMsgService.saveResutGame(this.resultColourPicker, this.collectionResults).then(() => {
    }).catch((error: any) => {
      console.error(error);
    });
  }

  play() {
    this.playing = true;
    let intervalId = setInterval(() => {
      this.timer++;
      if(this.timer >= 100){
        this.timer = 0;
        this.segundos++;
      }
      if (this.segundos >= 60) {
        this.segundos = 0;
        this.minutos++;
      }
      if (this.hasWon === true) {
        clearInterval(intervalId);
      }
    }, 10);
    while (this.count >= 0) {
      this.count = this.count - 1;
      this.colors.push(this.random_rgba());
    }
    this.principalColourText = this.colors[0].slice();
    this.colors.sort(() => Math.random() - 0.5);
  }

  reset() {
    this.intentos = 0;
    this.hasWon = false;
    this.principalColour = 'white';
    this.principalColourText = '';
    this.timer = 0;
    this.segundos = 0;
    this.minutos = 0;
    this.play();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 2000,
    });
  }

}
