import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgetPassComponent } from './components/auth/forget-pass/forget-pass.component';
import { ForgetPassOtpComponent } from './components/auth/forget-pass-otp/forget-pass-otp.component';
import { SuccessMessageComponent } from './components/auth/success-message/success-message.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatImportModule } from './module/mat-import/mat-import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserNavbarComponent } from './components/user/common/user-navbar/user-navbar.component';
import { UserSidebarComponent } from './components/user/common/user-sidebar/user-sidebar.component';
import { ClientDashboardComponent } from './components/client/client-dashboard/client-dashboard.component';
import { ClientNavbarComponent } from './components/client/common/client-navbar/client-navbar.component';
import { ClientSidebarComponent } from './components/client/common/client-sidebar/client-sidebar.component';
import { HomeComponent } from './components/common/home/home.component';
import { ResetPassComponent } from './components/auth/reset-pass/reset-pass.component';
import { ClientLedgerListComponent } from './components/admin/client-ledger/client-ledger-list/client-ledger-list.component';
import { ClientLedgerAddComponent } from './components/admin/client-ledger/client-ledger-add/client-ledger-add.component';
import { ClientLedgerEditComponent } from './components/admin/client-ledger/client-ledger-edit/client-ledger-edit.component';
import { InstallmentCheduleListComponent } from './components/admin/installment-schedule/installment-chedule-list/installment-chedule-list.component';
import { InstallmentCheduleAddComponent } from './components/admin/installment-schedule/installment-chedule-add/installment-chedule-add.component';
import { InstallmentCheduleEditComponent } from './components/admin/installment-schedule/installment-chedule-edit/installment-chedule-edit.component';
import { TransactionHistoryListComponent } from './components/admin/transaction-history/transaction-history-list/transaction-history-list.component';
import { TransactionHistoryAddComponent } from './components/admin/transaction-history/transaction-history-add/transaction-history-add.component';
import { TransactionHistoryEditComponent } from './components/admin/transaction-history/transaction-history-edit/transaction-history-edit.component';
import { RequestViewLedgerListComponent } from './components/admin/request-view-ledger/request-view-ledger-list/request-view-ledger-list.component';
import { ProfileComponent } from './components/common/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPassComponent,
    ForgetPassOtpComponent,
    SuccessMessageComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    UserDashboardComponent,
    UserNavbarComponent,
    UserSidebarComponent,
    ClientDashboardComponent,
    ClientNavbarComponent,
    ClientSidebarComponent,
    HomeComponent,
    ResetPassComponent,
    ClientLedgerListComponent,
    ClientLedgerAddComponent,
    ClientLedgerEditComponent,
    InstallmentCheduleListComponent,
    InstallmentCheduleAddComponent,
    InstallmentCheduleEditComponent,
    TransactionHistoryListComponent,
    TransactionHistoryAddComponent,
    TransactionHistoryEditComponent,
    RequestViewLedgerListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatImportModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('847336527526-up6n2lv2vhn5gnrt4inm0ce7qkj7otte.apps.googleusercontent.com'
    //         )
    //       },
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider('741838604668314')
    //       }
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
