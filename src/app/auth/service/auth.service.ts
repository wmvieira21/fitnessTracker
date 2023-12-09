import { AuthData } from '../model/auth-data.model';
import { User } from '../model/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedin = new BehaviorSubject<boolean>(false);
  private user: User = { email: '', userId: '' };

  registerUser(data: AuthData) {
    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    console.log(this.user);
    this.isLoggedin.next(true);
  }

  login(data: AuthData) {
    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    console.log(this.user);
    this.isLoggedin.next(true);
  }

  logout() {
    this.user = { email: '', userId: '' };
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
