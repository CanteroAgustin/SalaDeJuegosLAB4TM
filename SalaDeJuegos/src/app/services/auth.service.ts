import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userState: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
      } else {
        localStorage.removeItem('user')
      }
    })
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user || this.userState);
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      }).catch((error) => {
        this.openSnackBar('Error: ' + error.message);
      })
  }

  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user || this.userState);
      }).catch((error) => {
        this.openSnackBar('Error: ' + error.message);
      })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then(u => {
        if (u) {
          u.sendEmailVerification()
        }
      })
      .then(() => {
        this.router.navigate(['email-verification']);
      })
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.openSnackBar('El correo de recuperacion fue enviado, revisa tu bandeja');
      }).catch((error) => {
        this.openSnackBar('Error: ' + error.message);
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    return (user && user.emailVerified) ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user || this.userState());
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
      }).catch((error) => {
        this.openSnackBar('Error: ' + error.message);
      })
  }

  SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      emailVerified: user.emailVerified
    }
    localStorage.setItem('user', JSON.stringify(userState));
    return userRef.set(userState, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'cerrar', {
      duration: 5000,
    });
  }
}