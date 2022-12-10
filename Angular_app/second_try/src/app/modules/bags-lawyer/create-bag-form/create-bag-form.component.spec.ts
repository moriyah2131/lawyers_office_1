import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBagFormComponent } from './create-bag-form.component';

describe('CreateBagFormComponent', () => {
  let component: CreateBagFormComponent;
  let fixture: ComponentFixture<CreateBagFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBagFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
