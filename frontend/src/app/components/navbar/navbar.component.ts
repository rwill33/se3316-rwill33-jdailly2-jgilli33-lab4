import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;
  public isAdmin: string = this.authService.role.admin ? "Admin" : "Account";
  constructor(
    public authService: AuthService,
    private cdRef:ChangeDetectorRef
  ) {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user && user?.emailVerified){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      this.cdRef.detectChanges();
    })
  }

  ngOnInit(): void {
  }

}
