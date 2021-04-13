import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationToolbarComponent } from './presentation-toolbar.component';

describe('PresentationToolbarComponent', () => {
  let component: PresentationToolbarComponent;
  let fixture: ComponentFixture<PresentationToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
