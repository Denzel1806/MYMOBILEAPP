import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.initTheme();
  }

  private async initTheme() {
    const savedTheme = await this.storageService.get('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme !== null ? savedTheme : prefersDark;
    this.setDarkMode(isDark);
  }

  async setDarkMode(isDark: boolean) {
    this.darkModeSubject.next(isDark);
    await this.storageService.set('darkMode', isDark);
    document.body.classList.toggle('dark', isDark);
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}