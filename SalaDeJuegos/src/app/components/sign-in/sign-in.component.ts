import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from "../../services/auth.service";
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

const googleLogoURL =
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['home']);
    }
  }

  mockUser() {
    this.loginForm.setValue({
      user: 'agustin7_7@yahoo.com.ar',
      password: 'testUser'
    })
  }

}