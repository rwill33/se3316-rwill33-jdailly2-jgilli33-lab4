import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';
import { PermissionGuard } from './shared/guard/permission.guard';
const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'playlists', redirectTo: '', pathMatch: 'full'},
  {path: 'artists', redirectTo: '', pathMatch: 'full'},
  {path: 'genres', redirectTo: '', pathMatch: 'full'},
  {path: 'tracks', redirectTo: '', pathMatch: 'full'},
  { path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    {
      path: 'playlists',
      component: DashboardComponent
    },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [PermissionGuard]
// Permission which is need to access this component.
// Permission checked by Permission Guard
    }], canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
