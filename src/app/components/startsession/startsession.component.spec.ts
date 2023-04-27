import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsessionComponent } from './startsession.component';

describe('StartsessionComponent', () => {
  let component: StartsessionComponent;
  let fixture: ComponentFixture<StartsessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartsessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
