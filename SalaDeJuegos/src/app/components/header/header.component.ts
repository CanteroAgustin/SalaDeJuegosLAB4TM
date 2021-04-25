import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarEvent: EventEmitter<any> = new EventEmitter();
  isLoggedIn = false;
  completeWelcomeMsg = '';
  showHome = false;
  user: User | undefined;

  constructor(private router: Router, public authService: AuthService) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn;
      this.user = JSON.parse(localStorage.getItem('user') || "{}");
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
  }

  toggleSideBar() {
    this.toggleSideBarEvent.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}
