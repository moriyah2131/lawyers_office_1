import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBagDialogComponent } from './create-bag-dialog.component';

describe('CreateBagDialogComponent', () => {
  let component: CreateBagDialogComponent;
  let fixture: ComponentFixture<CreateBagDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBagDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
