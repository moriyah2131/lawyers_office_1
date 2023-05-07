import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { AllTasksListComponent } from './all-tasks-list/all-tasks-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { BagNameComponent } from './bag-name/bag-name.component';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  {
    path: 'tasks',
    component: AllTasksListComponent,
  },
];

@NgModule({
  declarations: [TasksListComponent, AllTasksListComponent, BagNameComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatMenuModule,
  ],
  exports: [
    TasksListComponent,
    BagNameComponent,
    ReactiveFormsModule,
    FormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatMenuModule,
  ],
})
export class SharedModule {}
