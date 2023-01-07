import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewBagsComponent } from './view-bags/view-bags.component';
import { BagInfoComponent } from './bag-info/bag-info.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilesDialogComponent } from './files-dialog/files-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MainComponentsModule } from '../main-components/main-components.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';

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
  declarations: [ViewBagsComponent, BagInfoComponent, FilesDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,

    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,

    // MainComponentsModule,
    SharedModule,
  ],
})
export class BagsModule {}
