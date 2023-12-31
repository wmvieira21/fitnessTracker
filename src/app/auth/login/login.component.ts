import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UIService } from 'src/app/shared/ui-service';
import { Store } from '@ngrx/store';
import { Observable, map, of, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { getIsLoading } from 'src/app/shared/ngrx/ui.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    public uiService: UIService,
    public store: Store<AppState>
  ) {
    this.form = formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }

  onSubmit() {
    this.authService.login(this.form.value);
  }
}
