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

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public db: AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

  }
  GetUsers() {
    const users: any = [];
    const ref = this.db.object('users');
    ref.query.ref.on('value', (snapshot) => {
      snapshot.forEach((snapshot) => {
        let user = snapshot.val();
        user['uid'] = snapshot.key;
        users.push(user);
      })
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    });
    return users;
  }
  ChangeUserPermission(admin: boolean, uid: string) {
    const ref = this.db.object('users/' + uid);
    ref.update({admin: admin});
  }
}
