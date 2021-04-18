import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() title = '';
  @Input() contentText = '';
  @Input() imgPath = '';
  @Input() redirectPath = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectTo() {
    this.router.navigate([this.redirectPath]);
  }

}
