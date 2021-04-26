import { Component, OnInit } from '@angular/core';
import { MemoryCardData } from 'src/app/models/memory-card-data';
import { RestartDialogComponent } from './restart-dialog/restart-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { User } from 'firebase';
import { MemoryResult } from './memoryResult';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  collection = "/memory";
  cardImages = [
    'pDGNBK9A0sk',
    'fYDrhbVlV1E',
    'qoXgaF27zBc',
    'b9drVB7xIOI',
    'TQ-q5WAVHj0'
  ];
  intentos = 0;
  user: User | undefined;
  cards: MemoryCardData[] = [];
  collectionResults = "/memoryResults";
  flippedCards: MemoryCardData[] = [];
  memoryResults: MemoryResult[] = [];
  memoryResult: MemoryResult = new MemoryResult;
  timer: number = 0;
  segundos: number = 0;
  minutos: number = 0;
  matchedCount = 0;
  count = 0;
  hasWon = false;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog, private firestore: AngularFirestore, private firestoreMsgService: FirestoreMessageService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.setupCards();
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: MemoryCardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    if (this.count === 0) {
      this.count++;
      let intervalId = setInterval(() => {
        this.timer++;
        if (this.timer >= 100) {
          this.timer = 0;
          this.segundos++;
        }
        if (this.segundos >= 60) {
          this.segundos = 0;
          this.minutos++;
        }
        if (this.hasWon) {
          clearInterval(intervalId);
        }
      }, 10);
    }
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    this.intentos++;
    console.log("intentos " + this.intentos);
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true
          });
          this.hasWon = true;
          console.log("intentos finales " + this.intentos);
          this.memoryResult.intentos = this.intentos;
          this.memoryResult.fecha = Date.now();
          this.memoryResult.email = this.user?.email;
          this.memoryResult.tiempo = this.minutos + " : " + this.segundos + " : " + this.timer;
          this.firestoreMsgService.saveResutGame(this.memoryResult, this.collectionResults).then(() => {
          }).catch((error: any) => {
            console.error(error);
          });
          dialogRef.afterClosed().subscribe(() => {
            this.count = 0;
            this.hasWon = false;
            this.minutos = 0;
            this.timer = 0;
            this.segundos = 0;
            this.restart();
          });
        }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }


}
