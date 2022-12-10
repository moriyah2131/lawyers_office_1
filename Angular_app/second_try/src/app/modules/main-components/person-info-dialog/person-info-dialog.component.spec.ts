import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInfoDialogComponent } from './person-info-dialog.component';

describe('PersonInfoDialogComponent', () => {
  let component: PersonInfoDialogComponent;
  let fixture: ComponentFixture<PersonInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
