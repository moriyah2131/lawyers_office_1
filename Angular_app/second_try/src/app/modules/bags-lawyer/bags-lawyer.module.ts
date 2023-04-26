import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBagsComponent } from './view-bags/view-bags.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateBagDialogComponent } from './create-bag-dialog/create-bag-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CreateBagFormComponent } from './create-bag-form/create-bag-form.component';
import { AssetFormComponent } from './asset-form/asset-form.component';
import { BagInfoComponent } from './bag-info/bag-info.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';
import { AssetInfoDialogComponent } from './asset-info-dialog/asset-info-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainComponentsModule } from '../main-components/main-components.module';
import { SharedModule } from '../shared/shared.module';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginsToPrintComponent } from './logins-to-print/logins-to-print.component';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';

const routes: Routes = [
  {
    path: 'view-bags',
    component: ViewBagsComponent,
  },
  {
    path: 'bag-info/:id',
    component: BagInfoComponent,
  },
];

@NgModule({
  declarations: [
    ViewBagsComponent,
    CreateBagDialogComponent,
    CreateBagFormComponent,
    AssetFormComponent,
    BagInfoComponent,
    AssetInfoComponent,
    AssetInfoDialogComponent,
    TaskDialogComponent,
    LoginsToPrintComponent,
    StatusDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    //HttpClientModule,
    //MainComponentsModule,
    SharedModule,
  ],
  exports: [CreateBagFormComponent],
})
export class BagsLawyerModule {}
