import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  error: boolean = false;
  errorMessage: string | null = null;
  constructor(
    public authService: AuthService
  ) {
    this.authService.getError().subscribe((value) => {
      this.error = value;
    });
    this.authService.getErrorMessage().subscribe((value) => {
      this.errorMessage = value;
    });
  }

  ngOnInit() {
    this.error = false;
    this.errorMessage = null;
  }

  inputValidation(email: any, password: any) {
    console.log(this.validateEmail(email));
    if (email === "" || !this.validateEmail(email)) {
      this.error = true;
      this.errorMessage = "Please enter a valid email"
    } else if (password === "") {
      this.error = true;
      this.errorMessage = "Please enter a password"
    } else {
      this.authService.SignIn(email, password)
    }
  }

  validateEmail(email: any) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
}
