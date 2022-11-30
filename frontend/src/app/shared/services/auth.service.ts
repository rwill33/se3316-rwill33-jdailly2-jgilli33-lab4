import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseError } from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  error: BehaviorSubject<boolean>;
  success: BehaviorSubject<boolean>;
  errorMessage: BehaviorSubject<string>;
  alert: BehaviorSubject<string>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public db: AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.success = new BehaviorSubject<boolean>(false);
    this.error = new BehaviorSubject<boolean>(false);
    this.errorMessage = new BehaviorSubject<string>("");
    this.alert = new BehaviorSubject<string>("");
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log(user);
        const ref = this.db.object('users/' + user.uid);
        ref.query.ref.on('value', (snapshot) => {
          const role = snapshot.val();
          if(role === null) {
            ref.set(
              {admin: false,
              username: user.displayName,
              email: user.email,
              isDisabled: false,
              }
            );
            localStorage.setItem('role', JSON.stringify({admin: false}));
          } else {
            localStorage.setItem('role', JSON.stringify({admin: role.admin}));
          }
        }, (errorObject) => {
          console.log('The read failed: ' + errorObject.name);
        });
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('role')!);
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('role', 'null');
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('role')!);
      }
    });
  }
  setError(value: boolean): void {
    this.error.next(value);
  }
  getError(): Observable<boolean> {
    return this.error.asObservable();
  }
  setErrorMessage(value: string): void {
    this.errorMessage.next(value);
  }
  getErrorMessage(): Observable<string> {
    return this.errorMessage.asObservable();
  }
  setSuccess(value: boolean): void {
    this.success.next(value);
  }
  getSuccess(): Observable<boolean> {
    return this.success.asObservable();
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.setError(false);
            this.router.navigate(['']);
          }
        });
      })
      .catch((error) => {
        // window.alert(error.message);
        console.log(error.code);
        this.setError(true);
        this.setErrorMessage(error.message)
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.updateProfile({displayName: username})
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
    // Returns true when user is logged in and email is verified
  get user(): any {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user;
    }
  get role(): any {
    const role = JSON.parse(localStorage.getItem('role')!);
    return role;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['']);
        }
      });
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        if( error.code === "auth/user-disabled") {
          window.alert("Account has been disabled.\nPlease contact rwill33@uwo.ca for help.");
        } else{
          window.alert(error);
        }
      });
  }
  ChangePassword(oldPassword: string, password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      this.afAuth.currentUser.then((user: any) => {
        if (user) {
          const credential = auth.EmailAuthProvider.credential(user.email, oldPassword)
          user.reauthenticateWithCredential(credential).then((data: any) => {
            console.log("Reauthenticated!");
            data.user.updatePassword(password)
            .then(() => {
              console.log("Update Success!")
              this.setSuccess(true);
              // Update successful.
            }).catch((error: FirebaseError) => {
              this.setError(true);
              if (error.code === "auth/weak-password") {
                this.setErrorMessage("Password must be at least 6 characters");
              } else {
                this.setErrorMessage(error.code);
              }
              console.log(error)
              this.setSuccess(false);
              // An error ocurred
              // ...
            });
          }

          ).catch((error: FirebaseError) => {
            this.setError(true);
              if (error.code === "auth/wrong-password") {
                this.setErrorMessage("Invalid old password");
              } else {
                this.setErrorMessage(error.code);
              }
            console.log(error)
            this.setSuccess(false);
          })
        }
      })
    } else {
      console.log("Passwords must match");
      this.setError(true);
      this.setErrorMessage("Passwords Must Match");
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['home']);
    });
  }
}
