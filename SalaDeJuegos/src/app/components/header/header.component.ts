import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showLogin: boolean = false;
  showPresentation: boolean = false;
  isLoggedIn = false;
  completeWelcomeMsg = '';
  showHome = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(e => {
      switch ((e as NavigationStart).url) {
        case '/':
          this.showPresentation = true;
          break;
        case '/presentation':
          if (this.isLoggedIn) {
            this.showHome = true;
          } else {
            this.showLogin = true;
          }
          this.showPresentation = false;
          break;
        case '/presentation/quien-soy':
          if (this.isLoggedIn) {
            this.showHome = true;
          } else {
            this.showLogin = true;
          }
          this.showPresentation = false;
          break;
        case '/presentation/que-es':
          if (this.isLoggedIn) {
            this.showHome = true;
          } else {
            this.showLogin = true;
          }
          this.showPresentation = false;
          break;
        case '/presentation/my-game':
          if (this.isLoggedIn) {
            this.showHome = true;
          } else {
            this.showLogin = true;
          }
          this.showPresentation = false;
          break;
        case '/email-verification':
          if (this.isLoggedIn) {
            this.showHome = true;
          } else {
            this.showLogin = true;
          }
          this.showPresentation = true;
          break;
        case '/sign-in':
          this.showPresentation = true;
          this.showLogin = false;
          this.showHome = false;
          break;
        
        default:
          this.showLogin = false;
          this.showPresentation = true;
      }
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

}
