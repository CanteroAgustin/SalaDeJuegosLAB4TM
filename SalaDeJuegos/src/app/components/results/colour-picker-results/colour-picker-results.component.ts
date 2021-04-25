import { Component, OnInit } from '@angular/core';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';
import { ResultColourPicker } from '../../juegos/colour-picker/resultColourPicker';

@Component({
  selector: 'app-colour-picker-results',
  templateUrl: './colour-picker-results.component.html',
  styleUrls: ['./colour-picker-results.component.scss']
})
export class ColourPickerResultsComponent implements OnInit {

  results: ResultColourPicker[] = [];
  displayedColumns: string[] = ['fecha', 'email', 'intentos', 'tiempo', 'win'];

  constructor(private firestoreService: FirestoreMessageService) { }

  ngOnInit(): void {
    this.firestoreService.getResultGame('/colourPickerResults').valueChanges().subscribe(response => {

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
