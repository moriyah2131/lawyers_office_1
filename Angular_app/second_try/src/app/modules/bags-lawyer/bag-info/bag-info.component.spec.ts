import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagInfoComponent } from './bag-info.component';

describe('BagInfoComponent', () => {
  let component: BagInfoComponent;
  let fixture: ComponentFixture<BagInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
