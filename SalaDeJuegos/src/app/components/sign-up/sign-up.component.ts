import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  registerForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}