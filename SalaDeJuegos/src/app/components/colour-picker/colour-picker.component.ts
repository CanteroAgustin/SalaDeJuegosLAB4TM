import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
    }
  }
    
  play() {
    this.playing = true;
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
    this.play();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 2000,
    });
  }

}
