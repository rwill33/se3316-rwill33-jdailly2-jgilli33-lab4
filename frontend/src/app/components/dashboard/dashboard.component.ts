import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public accountActive: boolean = false;
  public playlistsActive: boolean = false;
  public adminActive: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((val) => {
      this.accountActive = false;
      this.playlistsActive = false;
      this.adminActive = false;
      if (val.urlAfterRedirects === "/dashboard"){
        this.accountActive = true;
      } else if (val.urlAfterRedirects === "/dashboard/playlists") {
        this.playlistsActive = true;
      } else if (val.urlAfterRedirects === "/dashboard/admin") {
        this.adminActive = true;
      }
      console.log(val.urlAfterRedirects);
    })
  }

  ngOnInit(): void {}


}
