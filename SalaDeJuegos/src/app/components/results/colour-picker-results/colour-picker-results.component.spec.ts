import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourPickerResultsComponent } from './colour-picker-results.component';

describe('ColourPickerResultsComponent', () => {
  let component: ColourPickerResultsComponent;
  let fixture: ComponentFixture<ColourPickerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourPickerResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourPickerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
