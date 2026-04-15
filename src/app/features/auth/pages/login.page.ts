import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <ion-content class="login-content">
      <div class="login-container">
        <div class="header-section">
          <div class="logo">
            <ion-icon name="car-sport-outline" size="large"></ion-icon>
          </div>
          <h1 class="title">Welcome Back</h1>
          <p class="subtitle">Sign in to your AUTOSHOWROOM account</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
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
              label="Password"
              labelPlacement="floating"
              type="password"
              formControlName="password"
              placeholder="Enter your password"
            ></ion-input>
          </ion-item>

          <div class="form-options">
            <ion-checkbox labelPlacement="end">Remember me</ion-checkbox>
            <ion-button fill="clear" routerLink="/forgot-password" class="forgot-link">
              Forgot Password?
            </ion-button>
          </div>

          <ion-button
            expand="block"
            type="submit"
            [disabled]="loginForm.invalid"
            class="login-button"
          >
            Sign In
          </ion-button>
        </form>

        <div class="register-section">
          <p class="register-text">
            Don't have an account?
            <ion-button fill="clear" routerLink="/register" class="register-link">
              Sign Up
            </ion-button>
          </p>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Mock login - in real app, call auth service
      console.log('Login form:', this.loginForm.value);
      this.router.navigate(['/tabs/home']);
    }
  }
}