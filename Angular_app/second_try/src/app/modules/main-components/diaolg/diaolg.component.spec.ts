import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaolgComponent } from './diaolg.component';

describe('DiaolgComponent', () => {
  let component: DiaolgComponent;
  let fixture: ComponentFixture<DiaolgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaolgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaolgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
