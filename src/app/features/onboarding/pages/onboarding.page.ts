import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  template: `
    <ion-content class="onboarding-content">
      <div class="onboarding-container">
        <div class="slides-container">
          <div class="slide active">
            <div class="slide-image">
              <ion-icon name="car-sport-outline" size="large"></ion-icon>
            </div>
            <h2 class="slide-title">Welcome to AUTOSHOWROOM</h2>
            <p class="slide-description">
              Discover premium vehicles with our curated collection of the finest cars.
            </p>
          </div>
        </div>

        <div class="actions-section">
          <ion-button
            expand="block"
            color="primary"
            (click)="goToLogin()"
            class="cta-button"
          >
            Get Started
            <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
          </ion-button>

          <ion-button
            fill="clear"
            expand="block"
            (click)="skipOnboarding()"
            class="skip-button"
          >
            Skip
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class OnboardingPage {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  skipOnboarding() {
    this.router.navigate(['/login']);
  }
}