import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccoutContainerComponent } from './accout-container/accout-container.component';
import { AccountInfoComponent } from './account-info/account-info.component';
// import localeHe from '@angular/common/locales/he';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/services/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BagsLawyerModule } from '../bags-lawyer/bags-lawyer.module';

// registerLocaleData(localeHe);

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccoutContainerComponent,
    AccountInfoComponent,
  ],
  providers: [
    UserService,
    //  { provide: LOCALE_ID, useValue: 'he_IL' }
  ],
  exports: [AccoutContainerComponent, AccountInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    BagsLawyerModule,
  ],
})
export class AccountModule {}
