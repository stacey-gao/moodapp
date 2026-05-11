import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Weeklytrend } from './weeklytrend';

describe('Weeklytrend', () => {
  let component: Weeklytrend;
  let fixture: ComponentFixture<Weeklytrend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Weeklytrend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Weeklytrend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
