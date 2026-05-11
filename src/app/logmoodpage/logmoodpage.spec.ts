import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logmoodpage } from './logmoodpage';

describe('Logmoodpage', () => {
  let component: Logmoodpage;
  let fixture: ComponentFixture<Logmoodpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logmoodpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logmoodpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
