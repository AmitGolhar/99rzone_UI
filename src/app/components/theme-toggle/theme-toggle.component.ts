import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  theme = this.themeService.theme$.value;
  accent = this.themeService.accent$.value;

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.theme$.value;
  }

 changeAccent(event: Event) {
  const input = event.target as HTMLInputElement;
  const color = input?.value || '#007bff';
  this.themeService.setAccent(color);
  this.accent = color;
}

}
