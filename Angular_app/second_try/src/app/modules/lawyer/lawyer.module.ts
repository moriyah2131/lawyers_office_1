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

const routes: Routes = [
  {
    path: 'account',
    component: LawyerAccountComponent,
  },
];

@NgModule({
    declarations: [
      LawyerAccountComponent,
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
    ],
    providers: [
      AccountService,
      //  { provide: LOCALE_ID, useValue: 'he_IL' }
    ],
    exports: [LawyerAccountComponent, ],
  })
  export class LawyerModule {}
  