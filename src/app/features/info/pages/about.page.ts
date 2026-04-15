import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-about',
  template: `
    <ion-content class="about-content">
      <div class="about-container">
        <div class="hero-section">
          <div class="logo">
            <ion-icon name="car-sport-outline" size="large"></ion-icon>
          </div>
          <h1 class="brand-name">AUTOSHOWROOM</h1>
          <p class="tagline">Premium Cars, Exceptional Service</p>
        </div>

        <div class="content-section">
          <div class="mission-card">
            <h2 class="section-title">Our Mission</h2>
            <p class="mission-text">
              To provide an unparalleled online car shopping experience, connecting customers
              with their dream vehicles through innovative technology and premium service.
            </p>
          </div>

          <div class="vision-card">
            <h2 class="section-title">Our Vision</h2>
            <p class="vision-text">
              To become the leading digital automotive marketplace, revolutionizing how people
              discover, compare, and purchase vehicles worldwide.
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-item">
              <ion-icon name="shield-checkmark-outline" class="feature-icon"></ion-icon>
              <h3>Quality Assurance</h3>
              <p>All vehicles undergo rigorous inspection</p>
            </div>

            <div class="feature-item">
              <ion-icon name="headset-outline" class="feature-icon"></ion-icon>
              <h3>24/7 Support</h3>
              <p>Dedicated customer service team</p>
            </div>

            <div class="feature-item">
              <ion-icon name="car-outline" class="feature-icon"></ion-icon>
              <h3>Wide Selection</h3>
              <p>Extensive inventory of premium vehicles</p>
            </div>

            <div class="feature-item">
              <ion-icon name="card-outline" class="feature-icon"></ion-icon>
              <h3>Easy Financing</h3>
              <p>Flexible payment options available</p>
            </div>
          </div>

          <div class="contact-card">
            <h2 class="section-title">Contact Us</h2>
            <div class="contact-info">
              <div class="contact-item">
                <ion-icon name="mail-outline"></ion-icon>
                <span>support@autoshowroom.com</span>
              </div>
              <div class="contact-item">
                <ion-icon name="call-outline"></ion-icon>
                <span>+1 (555) 123-4567</span>
              </div>
              <div class="contact-item">
                <ion-icon name="location-outline"></ion-icon>
                <span>123 Auto Drive, Car City, CC 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AboutPage {}