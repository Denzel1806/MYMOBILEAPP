import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  template: `
    <ion-content class="forgot-content">
      <div class="forgot-container">
        <div class="header-section">
          <div class="logo">
            <ion-icon name="key-outline" size="large"></ion-icon>
          </div>
          <h1 class="title">Reset Password</h1>
          <p class="subtitle">Enter your email to receive reset instructions</p>
        </div>

        <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()" class="forgot-form">
          <ion-item class="form-item">
            <ion-input
              label="Email"
              labelPlacement="floating"
              type="email"
              formControlName="email"
              placeholder="Enter your email"
            ></ion-input>
          </ion-item>

          <ion-button
            expand="block"
            type="submit"
            [disabled]="forgotForm.invalid"
            class="reset-button"
          >
            Send Reset Link
          </ion-button>
        </form>

        <div class="back-section">
          <ion-button fill="clear" routerLink="/login" class="back-link">
            <ion-icon name="arrow-back-outline" slot="start"></ion-icon>
            Back to Login
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class ForgotPasswordPage {
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      // Mock forgot password - in real app, call auth service
      console.log('Forgot password for:', this.forgotForm.value.email);
      // Show success message and redirect
      this.router.navigate(['/login']);
    }
  }
}