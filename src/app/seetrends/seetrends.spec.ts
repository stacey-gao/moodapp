import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seetrends } from './seetrends';

describe('Seetrends', () => {
  let component: Seetrends;
  let fixture: ComponentFixture<Seetrends>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seetrends]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seetrends);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
