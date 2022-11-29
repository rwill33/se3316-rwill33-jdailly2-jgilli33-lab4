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
import { getAuth } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users?: Observable<any>;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public db: AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private http: HttpClient
  ) {
    this.users = this.db.object('users').valueChanges();
  }
  GetUsers() {
    return this.users;
  }
  ChangeUserPermission(admin: boolean, uid: string) {
    const ref = this.db.object('users/' + uid);
    ref.update({admin: admin});
  }

  setDisabled(isDisabled: boolean, uid: string) {
     return this.http.post("http://localhost:3000/api/updateUser", {disabled: isDisabled, uid: uid});
  }
}
