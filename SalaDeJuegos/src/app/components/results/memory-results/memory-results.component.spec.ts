import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryResultsComponent } from './memory-results.component';

describe('MemoryResultsComponent', () => {
  let component: MemoryResultsComponent;
  let fixture: ComponentFixture<MemoryResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
