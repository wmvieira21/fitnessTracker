import { Router } from '@angular/router';
import { AuthData } from '../model/auth-data.model';
import { User } from '../model/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedin = new BehaviorSubject<boolean>(false);
  private user: User | null = null;

  constructor(private router: Router) {}

  registerUser(data: AuthData) {
    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };

    this.isLoggedin.next(true);
    this.router.navigate(['/training']);
  }

  login(data: AuthData) {
    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };

    this.isLoggedin.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;

    this.isLoggedin.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    if (this.user == null) {
      this.router.navigate(['/']);
    }
    return this.user != null;
  }
}
