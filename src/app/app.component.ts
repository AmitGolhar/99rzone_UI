import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'w3realestateUI';
  showHeader = false;
loading = true;

   constructor(private router: Router,private themeService: ThemeService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const token = localStorage.getItem('auth_token');
      const hideRoutes = ['/login', '/register'];
      this.showHeader = !!token && !hideRoutes.includes(this.router.url);
    });
  }
    
 
ngOnInit(): void {
   setTimeout(() => {
    this.loading = false; // hide loader
  }, 1200);
    this.themeService.loadTheme(); // apply stored theme on app startup
  }
}
