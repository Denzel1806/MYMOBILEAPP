import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <ion-content class="register-content">
      <div class="register-container">
        <div class="header-section">
          <div class="logo">
            <ion-icon name="car-sport-outline" size="large"></ion-icon>
          </div>
          <h1 class="title">Create Account</h1>
          <p class="subtitle">Join AUTOSHOWROOM today</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <ion-item class="form-item">
            <ion-input
              label="Full Name"
              labelPlacement="floating"
              type="text"
              formControlName="fullName"
              placeholder="Enter your full name"
            ></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-input
              label="Email"
              labelPlacement="floating"
              type="email"
              formControlName="email"
              placeholder="Enter your email"
            ></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-input
              label="Phone"
              labelPlacement="floating"
              type="tel"
              formControlName="phone"
              placeholder="Enter your phone number"
            ></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-input
              label="Password"
              labelPlacement="floating"
              type="password"
              formControlName="password"
              placeholder="Create a password"
            ></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-input
              label="Confirm Password"
              labelPlacement="floating"
              type="password"
              formControlName="confirmPassword"
              placeholder="Confirm your password"
            ></ion-input>
          </ion-item>

          <ion-button
            expand="block"
            type="submit"
            [disabled]="registerForm.invalid"
            class="register-button"
          >
            Create Account
          </ion-button>
        </form>

        <div class="login-section">
          <p class="login-text">
            Already have an account?
            <ion-button fill="clear" routerLink="/login" class="login-link">
              Sign In
            </ion-button>
          </p>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Mock registration - in real app, call auth service
      console.log('Register form:', this.registerForm.value);
      this.router.navigate(['/tabs/home']);
    }
  }
}