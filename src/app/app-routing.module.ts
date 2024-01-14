import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgetPassComponent } from './components/auth/forget-pass/forget-pass.component';
import { ForgetPassOtpComponent } from './components/auth/forget-pass-otp/forget-pass-otp.component';
import { SuccessMessageComponent } from './components/auth/success-message/success-message.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { ClientDashboardComponent } from './components/client/client-dashboard/client-dashboard.component';
import { HomeComponent } from './components/common/home/home.component';
import { ResetPassComponent } from './components/auth/reset-pass/reset-pass.component';
import { ClientLedgerAddComponent } from './components/admin/client-ledger/client-ledger-add/client-ledger-add.component';
import { ClientLedgerListComponent } from './components/admin/client-ledger/client-ledger-list/client-ledger-list.component';
import { InstallmentCheduleListComponent } from './components/admin/installment-schedule/installment-chedule-list/installment-chedule-list.component';
import { InstallmentCheduleAddComponent } from './components/admin/installment-schedule/installment-chedule-add/installment-chedule-add.component';
import { InstallmentCheduleEditComponent } from './components/admin/installment-schedule/installment-chedule-edit/installment-chedule-edit.component';
import { TransactionHistoryListComponent } from './components/admin/transaction-history/transaction-history-list/transaction-history-list.component';
import { TransactionHistoryAddComponent } from './components/admin/transaction-history/transaction-history-add/transaction-history-add.component';
import { TransactionHistoryEditComponent } from './components/admin/transaction-history/transaction-history-edit/transaction-history-edit.component';
import { RequestViewLedgerListComponent } from './components/admin/request-view-ledger/request-view-ledger-list/request-view-ledger-list.component';
import { ProfileComponent } from './components/common/profile/profile.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"forget-pass", component: ForgetPassComponent},
  {path:"forget-pass-otp", component: ForgetPassOtpComponent},
  {path:"reset-pass", component: ResetPassComponent},
  {path:"success-message", component: SuccessMessageComponent},
  {path:"user-dashboard", component: UserDashboardComponent},
  {path:"client-dashboard", component: ClientDashboardComponent},
   
    
  {path:'ggc-home', component: NavbarComponent, children : 
  [
    {path: '', component: DashboardComponent}, 
    {path: 'client-ledger-list', component: ClientLedgerListComponent}, 
    {path: 'admin-dashboard', component: DashboardComponent}, 
    {path: 'client-ledger-add', component: ClientLedgerAddComponent},
    {path: 'client-ledger-edit/:id', component: ClientLedgerListComponent},
    {path: 'installment-schedule-list', component: InstallmentCheduleListComponent},
    {path: 'installment-schedule-add', component: InstallmentCheduleAddComponent},
    {path: 'installment-schedule-edit/:id', component: InstallmentCheduleEditComponent},
    {path: 'transaction-history-list', component: TransactionHistoryListComponent},
    {path: 'transaction-history-add', component: TransactionHistoryAddComponent},
    {path: 'transaction-history-edit/:id', component: TransactionHistoryEditComponent},
    {path: 'request-view-ledger-list', component: RequestViewLedgerListComponent},
    {path: 'profile', component: ProfileComponent},

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
