import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import {PublicPlaylistComponent} from './components/public_playlist/public-playlist.component';
import {GenresComponent} from './components/genres/genres.component';
import{TracksComponent} from './components/tracks/tracks.component';
import {ArtistComponent} from './components/artist/artist.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  //{path: '', component: PublicPlaylistComponent},
  {path: 'playlists',  component: PublicPlaylistComponent},
  {path: 'artists', component: ArtistComponent},
  {path: 'genres', component: GenresComponent},
  {path: 'tracks', component: TracksComponent},
  { path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
