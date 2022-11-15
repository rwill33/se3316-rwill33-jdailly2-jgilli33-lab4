import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  error: boolean;
  errorMessage: string | null;
  constructor(
    public authService: AuthService
  ) {
    this.error = false;
    this.errorMessage = null;
  }

  ngOnInit() {
    this.authService.getError().subscribe((value) => {
      this.error = value;
    });
    this.authService.getErrorMessage().subscribe((value) => {
      this.errorMessage = value;
    });
  }
}
