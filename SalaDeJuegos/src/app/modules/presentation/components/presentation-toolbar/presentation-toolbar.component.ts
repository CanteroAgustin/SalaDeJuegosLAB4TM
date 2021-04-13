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

  changeTab(e: any) {
    switch (e.index) {
    case 0:
        this.router.navigateByUrl('/presentation/quien-soy');
        break;
    case 1:
        this.router.navigateByUrl('/presentation/que-es');
        break;
    case 2:
        this.router.navigateByUrl('/presentation/my-game');
        break;

    default:
        console.log('e is: ', e, 'e.index is: ', e.index);
        break;
    }
}
}
