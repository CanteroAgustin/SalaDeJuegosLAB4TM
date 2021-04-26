import { Component, OnInit } from '@angular/core';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { PptResult } from "../../juegos/piedra-papel-tijera/pptResult";

@Component({
  selector: 'app-ppt-results',
  templateUrl: './ppt-results.component.html',
  styleUrls: ['./ppt-results.component.scss']
})
export class PptResultsComponent implements OnInit {

  results: PptResult[] = [];
  displayedColumns: string[] = ['fecha', 'email', 'ganadas', 'perdidas', 'win'];

  constructor(private firestoreService: FirestoreMessageService) { }

  ngOnInit(): void {
    this.firestoreService.getResultGame('/pptResults').valueChanges().subscribe(response => {

      this.results = response.sort(function (a, b) {
        if (a.ganadas < b.ganadas) {
          return 1;
        }
        if (a.ganadas > b.ganadas) {
          return -1;
        }
        if (a.perdidas < b.perdidas) {
          return 1;
        }
        if ( a.perdidas > b.perdidas) {
          return -1;
        }
        return 0;
      });
    });
  }

}
