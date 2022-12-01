import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import {PublicPlaylistComponent} from './components/public_playlist/public-playlist.component';
import{TracksComponent} from './components/tracks/tracks.component';
import { AcceptableUsePolicyComponent } from './components/acceptable-use-policy/acceptable-use-policy.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DmcaPolicyComponent } from './components/dmca-policy/dmca-policy.component';

// route guard
import { AuthGuard } from './shared/guard/auth.guard';
import { PermissionGuard } from './shared/guard/permission.guard';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AdminComponent } from './components/admin/admin.component';
import { AccountComponent } from './components/account/account.component';
import { ContainerComponent } from './components/container/container.component';
import { PublicPlaylistDetailsComponent } from './components/public-playlist-details/public-playlist-details.component';
import { TrackDetailsComponent } from './components/track-details/track-details.component';
const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  //{path: '', component: PublicPlaylistComponent},
  {path: 'playlists', component: ContainerComponent, children: [
    {
      path: '',
      component: PublicPlaylistComponent
    },
    {
      path: ':id',
      component: PublicPlaylistDetailsComponent
    }
  ]},

  {path: 'artists', component: ArtistComponent},
  {path: 'genres', component: GenresComponent},
  {path: 'tracks',
  children: [
    {
      path: '',
      component: TracksComponent
    },
    {path: ":id",
    component: TrackDetailsComponent
    }
  ]
},
  { path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'acceptable-use-policy', component: AcceptableUsePolicyComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'dmca-policy', component: DmcaPolicyComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
    {
      path: '',
      component: AccountComponent
    },
    {
      path: 'playlists',
      children: [
        {
          path: '',
          component: PlaylistsComponent,
        },
        {
          path: ":id",
          component: PlaylistComponent
        }
      ]
    },
    {
        path: 'admin',
        component: AdminComponent,
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
