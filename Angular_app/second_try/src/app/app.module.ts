import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './modules/account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponentsModule } from './modules/main-components/main-components.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { NavBarComponent } from './modules/main-components/nav-bar/nav-bar.component';
import { MyFooterComponent } from './modules/main-components/my-footer/my-footer.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent, NavBarComponent, MyFooterComponent],
  imports: [
    // CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccountModule,
    HttpClientModule,
    MainComponentsModule,
    TransactionModule,
    // SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MainComponentsModule],
})
export class AppModule {}
