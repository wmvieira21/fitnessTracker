import { Router } from '@angular/router';
import { AuthData } from '../model/auth-data.model';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrainingService } from 'src/app/training/service/training.service';
import { UIService } from 'src/app/shared/ui-service';
import { Store } from '@ngrx/store';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { startLoading, stopLoading } from 'src/app/shared/ngrx/ui.action';
import { AppState } from 'src/app/app.reducer';
import { setAuthenticated, setUnauthenticated } from '../store/auth.actions';
import { getIsAuthSelector } from '../store/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth = inject(Auth);

  constructor(
    private router: Router,

    private trainingService: TrainingService,
    private uiservice: UIService,
    private store: Store<AppState>
  ) {}

  registerUser(data: AuthData) {
    // this.uiservice.loadingStateChanded.next(true);
    this.store.dispatch(startLoading());

    createUserWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
        // this.uiservice.loadingStateChanded.next(false);
        this.store.dispatch(stopLoading());
      })
      .catch((error) => {
        // this.uiservice.loadingStateChanded.next(false);
        this.store.dispatch(stopLoading());
        this.uiservice.openSnackBar('This email has already been register');
      });
  }

  login(data: AuthData) {
    // this.uiservice.loadingStateChanded.next(true);
    this.store.dispatch(startLoading());
    signInWithEmailAndPassword(this._auth, data.email, data.password)
      .then((result) => {
        // this.uiservice.loadingStateChanded.next(false);
        this.store.dispatch(stopLoading());
      })
      .catch((error) => {
        // this.uiservice.loadingStateChanded.next(false);
        this.store.dispatch(stopLoading());
        this.uiservice.openSnackBar('Invalid credentials');
      });
  }

  initAuthListener() {
    this._auth.onAuthStateChanged((user) => {
      if (user) {
        // this.isAuth = true;
        // this.isLoggedin.next(true);
        this.store.dispatch(setAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();

        // this.isAuth = false;
        // this.isLoggedin.next(false);
        this.store.dispatch(setUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  isAuth() {
    return this.store.select(getIsAuthSelector);
  }

  logout() {
    this._auth.signOut();
  }
}
