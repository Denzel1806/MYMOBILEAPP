import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  template: `
    <ion-content class="splash-content">
      <div class="splash-container">
        <div class="logo-section">
          <div class="logo">
            <ion-icon name="car-sport-outline" size="large"></ion-icon>
          </div>
          <h1 class="brand-name">AUTOSHOWROOM</h1>
          <p class="tagline">Premium Cars, Exceptional Service</p>
        </div>

        <div class="loading-section">
          <ion-spinner name="crescent" color="primary"></ion-spinner>
          <p class="loading-text">Loading...</p>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class SplashPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Simulate loading time
    setTimeout(() => {
      this.router.navigate(['/welcome']);
    }, 3000);
  }
}