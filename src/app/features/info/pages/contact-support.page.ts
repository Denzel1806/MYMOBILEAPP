import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callOutline,
  mailOutline,
  chatbubbleOutline,
  sendOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-contact-support',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Contact Support</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="support-content">
        <div class="support-header">
          <h1>How can we help you?</h1>
          <p>Get in touch with our support team</p>
        </div>

        <div class="contact-options">
          <ion-card class="contact-card">
            <ion-card-content>
              <div class="contact-option">
                <ion-icon name="call-outline" class="contact-icon"></ion-icon>
                <div class="contact-info">
                  <h3>Phone Support</h3>
                  <p>Call us directly</p>
                  <p class="contact-detail">1-800-AUTOSHOW</p>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="contact-card">
            <ion-card-content>
              <div class="contact-option">
                <ion-icon name="mail-outline" class="contact-icon"></ion-icon>
                <div class="contact-info">
                  <h3>Email Support</h3>
                  <p>Send us an email</p>
                  <p class="contact-detail">support@autoshowroom.com</p>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="contact-card">
            <ion-card-content>
              <div class="contact-option">
                <ion-icon name="chatbubble-outline" class="contact-icon"></ion-icon>
                <div class="contact-info">
                  <h3>Live Chat</h3>
                  <p>Chat with our team</p>
                  <p class="contact-detail">Available 24/7</p>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="contact-form">
          <h2>Send us a message</h2>

          <ion-item>
            <ion-label position="stacked">Name</ion-label>
            <ion-input
              [(ngModel)]="contactForm.name"
              placeholder="Your full name"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              [(ngModel)]="contactForm.email"
              type="email"
              placeholder="your.email@example.com"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Subject</ion-label>
            <ion-input
              [(ngModel)]="contactForm.subject"
              placeholder="How can we help?"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Message</ion-label>
            <ion-textarea
              [(ngModel)]="contactForm.message"
              placeholder="Describe your issue or question..."
              rows="4"
            ></ion-textarea>
          </ion-item>

          <ion-button
            expand="block"
            size="large"
            class="send-btn"
            (click)="sendMessage()"
            [disabled]="!isFormValid()"
          >
            <ion-icon name="send-outline" slot="start"></ion-icon>
            Send Message
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .support-content {
      padding: 20px;
    }

    .support-header {
      text-align: center;
      margin-bottom: 30px;

      h1 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      p {
        color: var(--ion-color-medium);
        font-size: 16px;
      }
    }

    .contact-options {
      margin-bottom: 40px;
    }

    .contact-card {
      margin-bottom: 16px;
      --background: var(--ion-card-background);
    }

    .contact-option {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .contact-icon {
      font-size: 32px;
      color: var(--ion-color-primary);
    }

    .contact-info {
      flex: 1;

      h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      p {
        color: var(--ion-color-medium);
        font-size: 14px;
        margin-bottom: 2px;
      }

      .contact-detail {
        font-weight: 500;
        color: var(--ion-color-primary);
      }
    }

    .contact-form {
      h2 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      ion-item {
        margin-bottom: 16px;
      }
    }

    .send-btn {
      margin-top: 20px;
    }
  `],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    CommonModule,
    FormsModule,
  ],
})
export class ContactSupportPage {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  constructor(private toastController: ToastController) {
    addIcons({
      callOutline,
      mailOutline,
      chatbubbleOutline,
      sendOutline,
    });
  }

  isFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim()
    );
  }

  async sendMessage() {
    if (!this.isFormValid()) return;

    // In a real app, this would send the message to a backend service
    console.log('Sending message:', this.contactForm);

    const toast = await this.toastController.create({
      message: 'Message sent successfully! We\'ll get back to you soon.',
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    // Reset form
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}