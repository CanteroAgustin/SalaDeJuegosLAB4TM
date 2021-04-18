import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  titleTateti = 'Ta-Te-Ti';
  contentTextTateti = 'El clasico Ta-Te-Ti';
  imgPathTateti = '../assets/imagenes/tateti.jpg';
  redirectPathTateti = '/juegos/tateti';
  titlePpt = 'Piedra papel o tijera';
  contentTextPpt = 'El clasico Piedra papel o tijera';
  imgPathPpt = '../assets/imagenes/ppt.png';
  redirectPathPpt = '/juegos/piedraPapelTijera';
  panelOpenState = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
