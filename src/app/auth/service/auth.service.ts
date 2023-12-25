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
import { UIService } from 'src/app/shared/ui-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth = inject(Auth);
  isLoggedin = new BehaviorSubject<boolean>(false);
  isAuth = false;

  constructor(
    private router: Router,
    
    private trainingService: TrainingService,
    private uiservice: UIService
  ) {}

  registerUser(data: AuthData) {
    this.uiservice.loadingStateChanded.next(true);
    createUserWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
        this.uiservice.loadingStateChanded.next(false);
      })
      .catch((error) => {
        this.uiservice.loadingStateChanded.next(false);
        this.uiservice.openSnackBar('This email has already been register');
      });
  }

  login(data: AuthData) {
    this.uiservice.loadingStateChanded.next(true);
    signInWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
        this.uiservice.loadingStateChanded.next(false);
      })
      .catch((error) => {
        this.uiservice.loadingStateChanded.next(false);
        this.uiservice.openSnackBar('Invalid credentials');
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
}
