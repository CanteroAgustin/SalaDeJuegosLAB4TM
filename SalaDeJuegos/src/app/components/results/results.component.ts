import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  panelOpenStateTateti = false;
  panelOpenStatePpt = false;
  panelOpenStateMemory = false;
  panelOpenStateColour = false;

  constructor() { }

  ngOnInit(): void {
    this.panelOpenStateTateti = true;
  }

}
