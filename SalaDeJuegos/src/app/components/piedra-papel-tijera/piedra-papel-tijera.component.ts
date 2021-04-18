import { Component, OnInit } from '@angular/core';

import { GameService } from './game.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {

  collection = "/piedraPapelTijera";
  result: string | undefined;
  pointsUser = 0;
  pointsComp = 0;
  userChoise = '';
  compChoise = '';

  constructor(private playGame: GameService) { }

  ngOnInit(): void {
    this.result = 'Esperando jugada...';
    console.log(this.pointsUser);
  }

  play(choice: string): void {
    const result = this.playGame.game(choice);
    this.result = result.message;
    this.pointsUser += result.userAdd;
    this.pointsComp += result.compAdd;
    if (result.userChoise === 'r') {
      this.userChoise = '/assets/imagenes/rock.png';
    } else if (result.userChoise === 's') {
      this.userChoise = '/assets/imagenes/scissors.png';
    } else {
      this.userChoise = '/assets/imagenes/paper.png';
    }
    if (result.compChoise === 'r') {
      this.compChoise = '/assets/imagenes/rock.png';
    } else if (result.compChoise === 's') {
      this.compChoise = '/assets/imagenes/scissors.png';
    } else {
      this.compChoise = '/assets/imagenes/paper.png';
    }
  }

  reiniciar() {
    this.pointsComp = 0;
    this.pointsUser = 0;
    this.userChoise = '';
    this.compChoise = '';
  }

}
