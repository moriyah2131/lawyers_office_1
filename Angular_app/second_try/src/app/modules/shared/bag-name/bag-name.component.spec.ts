import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagNameComponent } from './bag-name.component';

describe('BagNameComponent', () => {
  let component: BagNameComponent;
  let fixture: ComponentFixture<BagNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
