import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
})
export class AuthentincationModule {}
