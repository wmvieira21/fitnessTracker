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
import { TrainingService } from 'src/app/training/service/training.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth = inject(Auth);
  isLoggedin = new BehaviorSubject<boolean>(false);
  isAuth = false;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private trainingService: TrainingService
  ) {}

  registerUser(data: AuthData) {
    createUserWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
      })
      .catch((error) => {
        this.openSnackBar(error.message, 'OK');
      });
  }

  login(data: AuthData) {
    signInWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
      })
      .catch((error) => {
        this.openSnackBar('Invalid credentials', 'OK');
      });
  }

  initAuthListener() {
    this._auth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
        this.isLoggedin.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();

        this.isAuth = false;
        this.isLoggedin.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this._auth.signOut();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
