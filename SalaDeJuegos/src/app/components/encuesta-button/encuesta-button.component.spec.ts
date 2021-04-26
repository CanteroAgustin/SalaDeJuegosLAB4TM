import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaButtonComponent } from './encuesta-button.component';

describe('EncuestaButtonComponent', () => {
  let component: EncuestaButtonComponent;
  let fixture: ComponentFixture<EncuestaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
