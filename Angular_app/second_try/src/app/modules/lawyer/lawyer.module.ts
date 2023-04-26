import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import { AccountService } from "src/app/services/Account.service";
import { SharedModule } from "../shared/shared.module";
import {  LawyerAccountComponent } from "./lawyer-account/lawyer-account.component";
import { UserListComponent } from './user-list/user-list.component';
import {MatTableModule} from '@angular/material/table';
import { LawyerListComponent } from './lawyer-list/lawyer-list.component';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";


const routes: Routes = [
  {
    path: 'account',
    component: LawyerAccountComponent,
  },
  {
    path: 'userlist',
    component: UserListComponent,
  },
  {
    path: 'lawyerlist',
    component: LawyerListComponent,
  },
];

@NgModule({
    declarations: [
      LawyerAccountComponent,
      UserListComponent,
      LawyerListComponent,
    ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      SharedModule,
      MatTableModule,
      MatInputModule,
      MatFormFieldModule,

      SharedModule
    ],
    providers: [
      AccountService,
      //  { provide: LOCALE_ID, useValue: 'he_IL' }
    ],
    exports: [LawyerAccountComponent, UserListComponent,LawyerListComponent],
  })
  export class LawyerModule {}
  