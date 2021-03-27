import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showLogin: boolean = false;
  showPresentation: boolean = false;
  showPipe: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(e => {
      switch ((e as NavigationStart).url) {
        case '/':
          this.showPresentation = true;
          break;
        case '/presentation':
          this.showLogin = true;
          this.showPresentation = true;
          this.showPipe = true;
          break;
        case '/email-verification':
          this.showLogin = true;
          break;
        case '/sign-in':
          this.showPresentation = true;
          break;
        default:
          this.showLogin = false;
      }
    })
  }

  ngOnInit(): void {

  }

}
