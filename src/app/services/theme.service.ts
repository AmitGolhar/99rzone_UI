import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app_theme';
  private readonly ACCENT_KEY = 'app_accent';

  theme$ = new BehaviorSubject<ThemeMode>('light');
  accent$ = new BehaviorSubject<string>('#007bff');

  constructor() {
    this.loadTheme();
  }

  setTheme(mode: ThemeMode) {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(this.THEME_KEY, mode);
    this.theme$.next(mode);
  }

  toggleTheme() {
    const newTheme = this.theme$.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setAccent(color: string) {
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem(this.ACCENT_KEY, color);
    this.accent$.next(color);
  }

  loadTheme() {
    const savedTheme = (localStorage.getItem(this.THEME_KEY) as ThemeMode) || 'light';
    const savedAccent = localStorage.getItem(this.ACCENT_KEY) || '#007bff';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.style.setProperty('--accent-color', savedAccent);
    this.theme$.next(savedTheme);
    this.accent$.next(savedAccent);
  }
}
