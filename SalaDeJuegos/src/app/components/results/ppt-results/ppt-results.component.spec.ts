import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PptResultsComponent } from './ppt-results.component';

describe('PptResultsComponent', () => {
  let component: PptResultsComponent;
  let fixture: ComponentFixture<PptResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PptResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PptResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
