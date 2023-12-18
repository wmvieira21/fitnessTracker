import { Router } from '@angular/router';
import { AuthData } from '../model/auth-data.model';
import { User } from '../model/user.model';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth = inject(Auth);
  isLoggedin = new BehaviorSubject<boolean>(false);
  isAuth = false;

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  registerUser(data: AuthData) {
    createUserWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
        this.isAuth = true;
        this.isLoggedin.next(true);
        this.router.navigate(['/training']);
      })
      .catch((error) => {
        this.openSnackBar(error.message, 'OK');
      });
  }

  login(data: AuthData) {
    signInWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
        this.isAuth = true;
        this.isLoggedin.next(true);
        this.router.navigate(['/training']);
      })
      .catch((error) => {
        this.openSnackBar('Invalid credentials', 'OK');
      });
  }

  logout() {
    this.isAuth = false;
    this.isLoggedin.next(false);
    this.router.navigate(['/login']);
    this._auth.signOut();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
