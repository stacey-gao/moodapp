import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logmood } from './logmood';

describe('Logmood', () => {
  let component: Logmood;
  let fixture: ComponentFixture<Logmood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logmood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logmood);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
