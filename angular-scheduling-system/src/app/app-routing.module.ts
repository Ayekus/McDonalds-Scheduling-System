import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SetupProfileComponent } from './components/setup-profile/setup-profile.component';
import { UpdateAvailabilityComponent } from './components/update-availability/update-availability.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'setup-profile', component: SetupProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update-availability', component: UpdateAvailabilityComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
