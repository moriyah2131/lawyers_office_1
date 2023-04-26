import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from '../account/account.module';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DiaolgComponent } from './diaolg/diaolg.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PersonInfoDialogComponent } from './person-info-dialog/person-info-dialog.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    DiaolgComponent,
    PersonInfoDialogComponent,
    TasksListComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AccountModule,
    // BrowserModule,
    // BrowserAnimationsModule,
  ],
  exports: [TasksListComponent],
})
export class MainComponentsModule {}
