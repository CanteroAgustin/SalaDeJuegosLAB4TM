import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreMessageService } from 'src/app/services/firestore-message.service';

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
  titleMemory = 'Juego de la memoria';
  contentTextMemory = 'El clasico juego de la memoria en el que haces coincidir las imagenes';
  imgPathMemory = '../assets/imagenes/memory.jpg';
  redirectPathMemory = '/juegos/memory';
  titleColourPicker = 'Colour Picker';
  contentTextColourPicker = 'Un juego para despertar los sentidos';
  imgPathColourPicker = '../assets/imagenes/colourPicker.png';
  redirectPathColourPicker = '/juegos/colourPicker';
  showEncuesta = true;
  panelOpenState = false;
  user: User | undefined;

  constructor(public authService: AuthService, private firestoreService: FirestoreMessageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.firestoreService.getResultGame('/encuestas').valueChanges().subscribe(response => {
      response.forEach(element => {
        if (element.usuario === this.user?.email) {
          this.showEncuesta = false;
        }
      });
    });
  }

  handleShowButtonEncuesta() {
    this.showEncuesta = false;
  }
}
