import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-presentation-toolbar',
  templateUrl: './presentation-toolbar.component.html',
  styleUrls: ['./presentation-toolbar.component.scss']
})
export class PresentationToolbarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateTo(element: string) {
    this.router.navigate([element], { relativeTo: this.route })
  }
}
