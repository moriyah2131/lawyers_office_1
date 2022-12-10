import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBagsComponent } from './view-bags.component';

describe('ViewBagsComponent', () => {
  let component: ViewBagsComponent;
  let fixture: ComponentFixture<ViewBagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
