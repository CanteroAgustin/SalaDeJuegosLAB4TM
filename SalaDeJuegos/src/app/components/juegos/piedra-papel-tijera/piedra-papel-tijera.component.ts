import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';

import { GameService } from './game.service';
import { PptResult } from './pptResult';

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
  collectionResults = "pptResults";
  pptResult: PptResult = new PptResult;
  resultsColourPicker: PptResult[] = [];
  user: User | undefined;

  constructor(private playGame: GameService, private firestoreMsgService: FirestoreMessageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.result = 'Esperando jugada...';
    this.firestoreMsgService.getResultGame('/pptResults').valueChanges().subscribe(response => {
      this.resultsColourPicker = response;
    });
    console.log(this.pointsUser);
  }
  play(choice: string): void {
    const result = this.playGame.game(choice);
    this.firestoreMsgService.getPptResult(this.collectionResults, this.user?.email).subscribe((doc: { data: () => any; }) => {
      const data = doc.data();
      if (data) {
        this.pptResult.ganadas = data.ganadas;
        this.pptResult.perdidas = data.perdidas;
        if (result.message === 'Ganas a la computadora') {
          this.pptResult.ganadas++;
        }
        if (result.message === 'Gana la computadora') {
          this.pptResult.perdidas++;
        }
        this.pptResult.fecha = Date.now();
        this.pptResult.email = this.user?.email;
        this.firestoreMsgService.savePptResult(this.pptResult, this.collectionResults);
      } else {
        if (result.message === 'Ganas a la computadora') {
          this.pptResult.ganadas = 1;
        }
        if (result.message === 'Gana la computadora') {
          this.pptResult.perdidas = 1;
        }
        this.pptResult.fecha = Date.now();
        this.pptResult.email = this.user?.email;
        this.firestoreMsgService.savePptResult(this.pptResult, this.collectionResults);
      }
    }, error => {
      console.log(error);
      if (result.message === 'Ganas a la computadora') {
        this.pptResult.ganadas = 1;
      }
      if (result.message === 'Gana la computadora') {
        this.pptResult.perdidas = 1;
      }
      this.pptResult.fecha = Date.now();
      this.pptResult.email = this.user?.email;
      this.firestoreMsgService.savePptResult(this.pptResult, this.collectionResults);
    });

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
