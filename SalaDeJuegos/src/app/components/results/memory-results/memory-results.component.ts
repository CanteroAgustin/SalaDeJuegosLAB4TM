import { Component, OnInit } from '@angular/core';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { MemoryResult } from '../../juegos/memory/memoryResult';

@Component({
  selector: 'app-memory-results',
  templateUrl: './memory-results.component.html',
  styleUrls: ['./memory-results.component.scss']
})
export class MemoryResultsComponent implements OnInit {

  results: MemoryResult[] = [];
  displayedColumns: string[] = ['fecha', 'email', 'intentos', 'tiempo', 'win'];

  constructor(private firestoreService: FirestoreMessageService) { }

  ngOnInit(): void {
    this.firestoreService.getResultGame('/memoryResults').valueChanges().subscribe(response => {

      this.results = response.sort(function (a, b) {
        if (a.intentos > b.intentos) {
          return 1;
        }
        if (a.intentos < b.intentos) {
          return -1;
        }
        if (a.tiempo > b.tiempo) {
          return 1;
        }
        if ( a.tiempo < b.tiempo) {
          return -1;
        }
        return 0;
      });
    });
  }

}
