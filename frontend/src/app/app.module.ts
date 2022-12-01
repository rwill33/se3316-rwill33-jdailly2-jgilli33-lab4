import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

// Auth Service
import { AuthService } from "./shared/services/auth.service";

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { PublicPlaylistComponent } from './components/public_playlist/public-playlist.component';
import { GenresComponent } from './components/genres/genres.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AccountComponent } from './components/account/account.component';
import { AlertComponent } from './components/alert/alert.component';
import { AdminComponent } from './components/admin/admin.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ContainerComponent } from './components/container/container.component';
import { PublicPlaylistDetailsComponent } from './components/public-playlist-details/public-playlist-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AcceptableUsePolicyComponent } from './components/acceptable-use-policy/acceptable-use-policy.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DmcaPolicyComponent } from './components/dmca-policy/dmca-policy.component';
import { TrackDetailsComponent } from './components/track-details/track-details.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HomeComponent,
    ButtonComponent,
    PublicPlaylistComponent,
    GenresComponent,
    TracksComponent,
    ArtistComponent,
    AccountComponent,
    AlertComponent,
    AdminComponent,
    PlaylistsComponent,
    PlaylistComponent,
    ContainerComponent,
    PublicPlaylistDetailsComponent,
    AcceptableUsePolicyComponent,
    PrivacyPolicyComponent,
    DmcaPolicyComponent,
    TrackDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
