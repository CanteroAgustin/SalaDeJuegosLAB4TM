import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-button',
  templateUrl: './encuesta-button.component.html',
  styleUrls: ['./encuesta-button.component.scss']
})
export class EncuestaButtonComponent implements OnInit {

  @Output() closeButtonEncuesta = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEncuesta() {
    this.router.navigate(['/encuesta']);
  }

  closeButton() {
    this.closeButtonEncuesta.emit();
  }
}
