import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sala de Juegos';
  sideBarOpen = false;
  isLoggedIn = false;

  toggleSideBarEventHandler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
