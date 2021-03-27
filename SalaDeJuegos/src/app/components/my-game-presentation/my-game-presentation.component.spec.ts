import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamePresentationComponent } from './my-game-presentation.component';

describe('MyGamePresentationComponent', () => {
  let component: MyGamePresentationComponent;
  let fixture: ComponentFixture<MyGamePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGamePresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGamePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
