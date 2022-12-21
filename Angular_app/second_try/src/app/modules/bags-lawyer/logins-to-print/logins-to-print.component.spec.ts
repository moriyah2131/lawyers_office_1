import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsToPrintComponent } from './logins-to-print.component';

describe('LoginsToPrintComponent', () => {
  let component: LoginsToPrintComponent;
  let fixture: ComponentFixture<LoginsToPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginsToPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginsToPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
