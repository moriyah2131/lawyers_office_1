import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksListComponent } from './all-tasks-list.component';

describe('AllTasksListComponent', () => {
  let component: AllTasksListComponent;
  let fixture: ComponentFixture<AllTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTasksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
