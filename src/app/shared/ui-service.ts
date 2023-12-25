import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIService {
  loadingStateChanded = new BehaviorSubject<boolean>(false);
  loadingTrainingStateChanded = new BehaviorSubject<boolean>(false);

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 5000,
    });
  }
}
