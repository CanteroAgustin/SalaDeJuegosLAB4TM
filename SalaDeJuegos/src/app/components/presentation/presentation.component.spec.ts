import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBiographyComponent } from './presentation.component';

describe('MyBiographyComponent', () => {
  let component: MyBiographyComponent;
  let fixture: ComponentFixture<MyBiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBiographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
